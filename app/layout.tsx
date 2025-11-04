import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NextAuthProvider from "./NextAuthProvider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Finance App",
  description: "Simple Finance Manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`flex ${geistSans.variable} ${geistMono.variable} flex-col antialiased`}
        cz-shortcut-listen="true"
      >
        <NextAuthProvider>
          <SidebarProvider>
            <div className="flex flex-row w-full h-full">
              <div className="flex flex-col relative">
                <AppSidebar />
                <SidebarTrigger className="flex z-10 justify-end w-full px-10 pt-2  absolute bg-transparent hover:bg-transparent hover:cursor-pointer" />
              </div>
              <div className="flex flex-col w-full h-full">
                <div className="flex p-2 h-full w-full">{children}</div>
              </div>
            </div>
          </SidebarProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
