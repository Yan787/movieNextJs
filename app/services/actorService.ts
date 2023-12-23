import { IActorEditInput } from '@/screens/Admin/Actor/ActorEditInterface'
import { getActorsUrl } from '@/config/apiConfig'
import { IActor } from '@/shared/types/movieTypes'
import axios, { axiosClassic } from 'api/interceptors'

export const ActorService = {
	async getAll(searchTerm?: string) {
		return axiosClassic.get<IActor[]>(getActorsUrl(``), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic.get<IActor>(getActorsUrl(`/by-slug/${slug}`))
	},

	async getById(_id: string) {
		return axios.get<IActorEditInput>(getActorsUrl(`/${_id}`))
	},

	async create() {
		return axios.post<string>(getActorsUrl('/'))
  	},

	async update(_id: string, data: IActorEditInput) {
		return axios.put<string>(getActorsUrl(`/${_id}`), data)
  	},
	
    async delete(_id: string) {
		return axios.delete<string>(getActorsUrl(`/${_id}`))
	}
}