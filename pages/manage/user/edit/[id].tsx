import UserEdit from '@/screens/Admin/User/UserEdit'

import { NextPageAuth } from '@/shared/types/authTypes'

const UserEditPage: NextPageAuth = () => {
	return <UserEdit />
}

UserEditPage.isOnlyAdmin = true

export default UserEditPage
