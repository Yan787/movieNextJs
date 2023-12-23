import { IMovie } from "@/shared/types/movieTypes"

export interface ISlide extends Pick<IMovie, '_id' | 'bigPoster' | 'title'> {
    	subTitle: string
    	link: string
}
    