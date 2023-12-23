import { ActorService } from "@/services/actorService"
import { useQuery } from "react-query"
import { toastError } from "@/utils/toastError"
import { IOption } from "@/ui/Select/selectInterface"

export const useAdminActors = () => {
    const queryData = useQuery('list of actor', ()=> ActorService.getAll(), {
        select: ({data})=> data.map((actor): IOption=> ({
            label: actor.name,
            value: actor._id
        })),
        onError(error) {
			toastError(error, 'actor list')
		},
    })

    return queryData
}