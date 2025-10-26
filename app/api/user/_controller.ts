import { connectToMongo } from "@/lib/db/mongo";
import UserModel from "@/models/user.model";
import { RegistrySchema } from "@/schemas";
import mongoose from "mongoose";
import * as z from "zod";

export async function registry(data: z.infer<typeof RegistrySchema>) {
  console.log(data);
  try {
    const { name, email, password }: z.infer<typeof RegistrySchema> = data;
    await connectToMongo();
    await UserModel.create({ name, email, password });
    await mongoose.connection.close();
    return { error: false, success: true };
  } catch (e) {
    console.log(e);
    return { error: true, success: false, errorMessage: e };
  }
}
