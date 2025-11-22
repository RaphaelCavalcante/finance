"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"


const withAuth = (Component: any) => {
    const auth = (props: any) => {
        const router = useRouter()
        const { data: session, status } = useSession({
            required: true, onUnauthenticated() {
                router.push("/login")
            }
        })
        if (status === "loading") {
            return <div>Loading...</div>
        } return <Component {...props} />
    }
    return auth
}
export default withAuth
