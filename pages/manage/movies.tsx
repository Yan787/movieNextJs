import MovieList from '@/screens/Admin/Movies/MovieList'

import { NextPageAuth } from '@/shared/types/authTypes'

const MovieListPage: NextPageAuth = () => {
	return <MovieList />
}

MovieListPage.isOnlyAdmin = true

export default MovieListPage
