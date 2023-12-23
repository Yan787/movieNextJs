import GenreList from '@/screens/Admin/Genres/GenreList'

import { NextPageAuth } from '@/shared/types/authTypes'

const GenreListPage: NextPageAuth = () => {
	return <GenreList />
}

GenreListPage.isOnlyAdmin = true

export default GenreListPage
