import MovieEdit from '@/screens/Admin/Movie/MovieEdit'

import { NextPageAuth } from '@/shared/types/authTypes'

const MovieEditPage: NextPageAuth = () => {
	return <MovieEdit />
}

MovieEditPage.isOnlyAdmin = true

export default MovieEditPage
