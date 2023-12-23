import UserList from '@/screens/Admin/Users/UserList'

import { NextPageAuth } from '@/shared/types/authTypes'

const UserListPage: NextPageAuth = () => {
	return <UserList />
}

UserListPage.isOnlyAdmin = true

export default UserListPage
