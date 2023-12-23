import { IMovie } from "@/shared/types/movieTypes"

export interface ICatalog {
    title: string
    description?: string
    movies: IMovie[]
}