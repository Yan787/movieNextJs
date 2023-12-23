import { API_URL, API_SERVER_URL } from "@/config/apiConfig";
import { IS_PRODUCTION } from "@/config/constants";
import { removeTokensStorage } from "@/services/auth/authHelper";
import { AuthService } from "@/services/auth/authService";
import axios from "axios";
import Cookies from "js-cookie";
import { errorCatch, getContentType } from "./apiHelpers";

export const axiosClassic = axios.create({
    baseURL: IS_PRODUCTION ? API_SERVER_URL : API_URL,
    headers: getContentType()
})

export const instance = axios.create({
    baseURL: API_URL,
    headers: getContentType()
})

instance.interceptors.request.use((config) => {
    const accessToken = Cookies.get('accessToken')

    if (config.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
    }

    return config
})

instance.interceptors.response.use(
	(config) => config,
	async (error) => {
		const originalRequest = error.config

		if (
			(error.response.status === 401 ||
				errorCatch(error) === 'jwt expired' ||
				errorCatch(error) === 'jwt must be provided') &&
			error.config &&
			!error.config._isRetry
		) {
			originalRequest._isRetry = true
			try {
				await AuthService.getNewToken()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeTokensStorage()
			}
		}

		throw error
	}
)

export default instance

