import Admin from '@/screens/Admin/Home/Admin'

import { NextPageAuth } from '@/shared/types/authTypes'

const AdminPage: NextPageAuth = () => {
	return <Admin />
}

AdminPage.isOnlyAdmin = true

export default AdminPage
