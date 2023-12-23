import { IMovie } from "@/shared/types/movieTypes"

export interface IMovieList {
    title: string
	link: string
	movies: IMovie[]
}