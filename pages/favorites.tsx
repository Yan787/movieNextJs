import Favorites from '@/screens/Favorites/Favorites'

import { NextPageAuth } from '@/shared/types/authTypes'

const FavoritesPage: NextPageAuth = () => {
	return <Favorites />
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
