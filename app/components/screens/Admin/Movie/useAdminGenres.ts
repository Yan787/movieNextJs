import { GenreService } from "@/services/genreService"
import { useQuery } from "react-query"
import { toastError } from "@/utils/toastError"
import { IOption } from "@/ui/Select/selectInterface"

export const useAdminGenres = () => {
    const queryData = useQuery('list of genre', ()=> GenreService.getAll(), {
        select: ({data})=> data.map((genre): IOption=> ({
            label: genre.name,
            value: genre._id
        })),
        onError(error) {
			toastError(error, 'genre list')
		},
    }) 

    return queryData
}