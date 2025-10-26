import NextAuth, {
  Awaitable,
  NextAuthOptions,
  RequestInternal,
  User,
} from "next-auth";
import Google from "next-auth/providers/google";

import { connectToMongo } from "./db/mongo";
import Credentials from "next-auth/providers/credentials";
import UserModel from "@/models/user.model";
import { compareSync } from "bcrypt-ts";
import mongoose from "mongoose";

export const options: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID || "",
      clientSecret: process.env.GOOGLE_SECRET || "",
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "example@email.com",
        },
        password: { label: "Password", type: "password" },
      },

      authorize: async function (credentials: any, req: any): Promise<any> {
        await connectToMongo();
        try {
          if (!credentials?.email || !credentials.password) {
            await mongoose.connection.close();
            throw new Error("Email and password are required");
          }
          const user = await UserModel.findOne({
            email: credentials.email,
          }).exec();
          const isValidPassword = compareSync(
            credentials.password,
            user.password
          );
          if (!user) {
            await mongoose.connection.close();
            throw new Error("Email and password are required");
          }

          if (!isValidPassword) {
            await mongoose.connection.close();
            throw new Error("Email and password are required");
          }
          return { id: user.id, name: user.name, email: user.email };
        } catch (e) {
          console.log(e);
          await mongoose.connection.close();
        }
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user = token.user;
      return session;
    },
    async signIn(params) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
};
