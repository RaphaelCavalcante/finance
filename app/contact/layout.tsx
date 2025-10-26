import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Contact",
    description: "Page to Contact"
}
export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return <section className="min-h-screen flex justify-center items-center">{children}</section>
}