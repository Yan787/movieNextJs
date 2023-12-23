import { getAuthUrl } from "@/config/apiConfig"
import { IAuthResponse } from "@/store/user/userInterface"
import { axiosClassic } from "api/interceptors"
import { removeTokensStorage, saveToStorage } from "./authHelper"
import Cookies from 'js-cookie'
import { getContentType } from "api/apiHelpers"

export const AuthService = {
    async register(email: string, password: string) {
        const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/register'), {email, password})

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response
    },

    async login(email: string, password: string) {
        const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login'), {email, password})

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response
    },

    logout() {
        removeTokensStorage()
        localStorage.removeItem('user')
    },

   async getNewToken() {
        const refresh = Cookies.get('refreshToken')

        const response = await axiosClassic.post<IAuthResponse>(getAuthUrl('/login/access-token'), {refresh}, {headers: getContentType()})

        if (response.data.accessToken) {
            saveToStorage(response.data)
        }

        return response
    }
}