"use client";
import { SessionProvider } from "next-auth/react";

type AuthProps = {
  children?: React.ReactNode;
};
export default function ({ children }: AuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
