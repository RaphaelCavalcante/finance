import { AlertTriangle } from "lucide-react"

interface ErrorProps {
    message?: string
}
function FormError({ message }: ErrorProps) {
    if (!message) {
        return null
    }
    return <div className="bg-destructive/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-destructive">
        <AlertTriangle width={16} height={16} />
        <p>{message}</p>
    </div>
}
export default FormError