import Profile from '@/screens/Profile/Profile'

import { NextPageAuth } from '@/shared/types/authTypes'

const ProfilePage: NextPageAuth = () => {
	return <Profile />
}

ProfilePage.isOnlyUser = true

export default ProfilePage
