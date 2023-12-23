import { getAdminUrl } from "@/config/urlConfig";
import { UserService } from "@/services/userService";
import { toastError } from "@/utils/toastError";
import { useRouter } from "next/router";
import { SubmitHandler, UseFormSetValue } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { toast } from "react-toastify";
import { IUserEditInput } from "./UserEditInterface";

export const useUserEdit = (setValue: UseFormSetValue<IUserEditInput>) => {
    const {query, push} = useRouter()
    const userId = String(query.id)

    const {isLoading} = useQuery(['user', userId], ()=> UserService.getById(userId), {
        onSuccess({data}) {
            setValue('email', data.email)
            setValue('isAdmin', data.isAdmin)
        },
        onError(error) {
            toastError(error)
        },
        enabled: !!query.id
    })

    const {mutateAsync} = useMutation('update user',
        (data: IUserEditInput)=> UserService.update(userId, data), {
        onSuccess() {
            toast.success('update was successful')
            push(getAdminUrl('users'))
        },
        onError(error) {
            toastError(error)
        },
    })

    const onSubmit: SubmitHandler<IUserEditInput>  = async (data) => {
        await mutateAsync(data)
    }

    return {isLoading, onSubmit}
}