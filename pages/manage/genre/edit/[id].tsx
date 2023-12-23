import GenreEdit from '@/screens/Admin/Genre/GenreEdit'

import { NextPageAuth } from '@/shared/types/authTypes'

const GenreEditPage: NextPageAuth = () => {
	return <GenreEdit />
}

GenreEditPage.isOnlyAdmin = true

export default GenreEditPage
