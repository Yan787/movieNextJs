import { errorCatch } from "api/apiHelpers"
import { toast } from "react-toastify"

export const toastError = (error: any, title?: string) => {
    const message = errorCatch(error)
    toast.error(title ||  message)
    throw message
}
