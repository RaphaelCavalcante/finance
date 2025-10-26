"use client"
import { useRouter } from "next/navigation"

interface ButtonProps {
    children: React.ReactNode,
    mode?: "modal" | "redirect",
    path?: string,
    asChild?: boolean
}
function Button({ children, mode = "redirect", path = "#", asChild }: ButtonProps) {
    const router = useRouter()
    const onClick = () => {
        router.push(path)
    }
    return <span onClick={onClick} className="cursor-pointer">{children}</span>
}
export default Button
