import { IMovie } from "@/shared/types/movieTypes"

export interface IMovieEditInput extends Omit<IMovie, '_id'> {}
