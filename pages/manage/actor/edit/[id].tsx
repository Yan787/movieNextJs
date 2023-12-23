import ActorEdit from '@/screens/Admin/Actor/ActorEdit'

import { NextPageAuth } from '@/shared/types/authTypes'

const ActorEditPage: NextPageAuth = () => {
	return <ActorEdit />
}

ActorEditPage.isOnlyAdmin = true

export default ActorEditPage
