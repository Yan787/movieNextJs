import { useAuth } from "@/hooks/useAuth"
import { UserService } from "@/services/userService"
import { useQuery } from "react-query"

export const useFavorites = () => {
	const { user } = useAuth()
	
	const {
		isLoading,
		data: favoritesMovies,
		refetch,
	} = useQuery('Favorite movies', () => UserService.getFavorites(), {
		select: ({ data }) => data,
		enabled: !!user
	})

	return { isLoading, favoritesMovies, refetch }
}