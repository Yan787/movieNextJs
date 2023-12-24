import { getMoviesUrl } from "@/config/apiConfig"
import { IMovie } from "@/shared/types/movieTypes"
import { axiosClassic } from "api/interceptors"

import axios from 'api/interceptors'
import { IMovieEditInput } from "@/screens/Admin/Movie/MovieEditInterface"

export const MovieService = {
    async getAll(searchTerm?: string) {
        return axiosClassic.get<IMovie[]>(getMoviesUrl(''), {
            params: searchTerm ? {searchTerm} : {}
        })
    },

    async updateCountOpened(slug: string) {
		return axiosClassic.post(getMoviesUrl('/update-count-opened'), {slug})
	},

    async getBySlug(slug: string) {
		return axiosClassic.get<IMovie>(getMoviesUrl(`/by-slug/${slug}`))
	},
    
    async getMostPopularMovies() {
        return axiosClassic.get<IMovie[]>(getMoviesUrl('/most-popular'))
    },

	async getByActor(actorId: string) {
		return axiosClassic.get<IMovie[]>(getMoviesUrl(`/by-actor/${actorId}`))
	},

    async getByGenres(genreIds: string[]) {
		return axiosClassic.post<IMovie[]>(getMoviesUrl(`/by-genres`), {
			genreIds,
		})
	},

    async getById(_id: string) {
        return axios.get<IMovieEditInput>(getMoviesUrl(`/${_id}`))
    },

    async create() {
        return axios.post<string>(getMoviesUrl('/'))
    },

    async update(_id: string, data: IMovieEditInput) {
        return axios.put<string>(getMoviesUrl(`/${_id}`), data)
    },

    async delete(_id: string) {
		return axios.delete<string>(getMoviesUrl(`/${_id}`))
	}
}
