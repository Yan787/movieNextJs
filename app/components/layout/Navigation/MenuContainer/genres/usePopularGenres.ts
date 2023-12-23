import { getGenreUrl } from "@/config/urlConfig"
import { GenreService } from "@/services/genreService"
import { useQuery } from "react-query"
import { IMenuItem } from "../menuInterface"

export const usePopularGenres = () => {
    const queryData = useQuery('popular genre menu', () => GenreService.getAll(), {
        select: ({data}) => data.filter(genre=> genre.icon).map(genre=> ({
            title: genre.name,
            icon: genre.icon,
            link: getGenreUrl(genre.slug)
        } as IMenuItem)).splice(0, 4)
    })
    return queryData
}
