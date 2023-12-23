import ActorList from '@/screens/Admin/Actors/ActorList'

import { NextPageAuth } from '@/shared/types/authTypes'

const ActorListPage: NextPageAuth = () => {
	return <ActorList />
}

ActorListPage.isOnlyAdmin = true

export default ActorListPage
