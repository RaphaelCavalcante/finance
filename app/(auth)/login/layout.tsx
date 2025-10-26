import { APP_NAME } from "@/resources/constant";
import { Metadata } from "next";



export const metadata: Metadata = {
    title: `${APP_NAME} - Login`,
    description: "Login Page"
}
export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return <section className="min-h-screen flex justify-center items-center">
       {children}
    </section>
}