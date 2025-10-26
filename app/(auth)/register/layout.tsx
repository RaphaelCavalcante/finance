import { APP_NAME } from "@/resources/constant";
import { ArrowBigLeftDash, SquareArrowLeftIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
    title: `${APP_NAME} - Register`,
    description: "New User Register Page"
}

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
    return <section className="w-full min-h-screen flex justify-center items-center">
        <div className="flex flex-col w-full h-full">
            <div className="flex flex-row w-full bg-gray-100 space-x-2 p-1">
                <ArrowBigLeftDash height={32} width={32} />
                <div className="flex align-middle h-full pt-1">
                    <Link href="/">
                        Return
                    </Link>
                </div>
            </div>
            {children}
           
        </div>
    </section>
}