import { IProfileInput } from '@/screens/Profile/ProfileInterface'
import { getUsersUrl } from '@/config/apiConfig'
import { IUser } from '@/shared/types/userTypes'
import axios from 'api/interceptors'
import { IMovie } from '@/shared/types/movieTypes'

export const UserService = {
	async getAll(searchTerm?: string) {
		return axios.get<IUser[]>(getUsersUrl(''), {
			params: searchTerm
				? {
						searchTerm,
				  }
				: {},
		})
	},

	async getFavorites() {
		return axios.get<IMovie[]>(getUsersUrl('/profile/favorites'))
	},

	async toggleFavorite(movieId: string) {
		return axios.post(getUsersUrl('/profile/favorites'), {movieId})
	},

	async getProfile() {
		return axios.get<IUser>(getUsersUrl('/profile'))
	},

	async updateProfile(data: IProfileInput) {
		return axios.put<string>(getUsersUrl('/profile'), data)
	},

	async getById(_id: string) {
		return axios.get<IUser>(getUsersUrl(`/${_id}`))
	},

	async update(_id: string, data: IProfileInput) {
		return axios.put<string>(getUsersUrl(`/${_id}`), data)
	},
	
	async delete(_id: string) {
		return axios.delete<string>(getUsersUrl(`/${_id}`))
	}
}