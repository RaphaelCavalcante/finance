import { getServerSession, User } from "next-auth";

export const session = async ({ session, token }: any) => {
  session.user.id = token.id;
  return session;
};

export const getUserSession = async (): Promise<any> => {
  try {
    const authUserSession = await getServerSession({ callbacks: session });
    if (!authUserSession) {
      throw new Error("unauthorized");
    }
    return authUserSession;
  } catch (err: any) {
    console.error("Unauthorized");
    return null;
  }
};
