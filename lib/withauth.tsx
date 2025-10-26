import { useSession } from "next-auth/react"
import { useRouter } from "next/router"

const withAuth = (Component: any) => {
    const auth = (props: any) => {
        const { data: session, status } = useSession({
            required: true, onUnauthenticated() {
                useRouter().push("/login")
            }
        })
        if (status === "loading") {
            return <div>Loading...</div>
        } return <Component {...props} />
    }
    return auth
}
export default withAuth
