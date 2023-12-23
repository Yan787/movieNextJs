import { getGenresUrl } from '@/config/apiConfig'
import { IGenre } from '@/shared/types/movieTypes'
import { axiosClassic } from 'api/interceptors'
import axios from 'api/interceptors'
import { IGenreEditInput } from '@/screens/Admin/Genre/GenreEditInterface'
import { ICollection } from '@/screens/Collections/CollectionsInterface'

export const GenreService = {
    async getAll(searchTerm?: string) {
        return axiosClassic.get<IGenre[]>(getGenresUrl(''), {
            params: searchTerm ? {searchTerm} : {}
        })
    },

    async getCollections() {
		return axiosClassic.get<ICollection[]>(getGenresUrl('/collections'))
	},

    async getBySlug(slug: string) {
		return axiosClassic.get<IGenre>(getGenresUrl(`/by-slug/${slug}`))
	},

    async getById(_id: string) {
	    return axios.get<IGenreEditInput>(getGenresUrl(`/${_id}`))
	},

    async create() {
	    return axios.post<string>(getGenresUrl('/'))
	},

    async update(_id: string, data: IGenreEditInput) {
	    return axios.put<string>(getGenresUrl(`/${_id}`), data)
	},

    async delete(_id: string) {
	    return axios.delete<string>(getGenresUrl(`/${_id}`))
	}
}