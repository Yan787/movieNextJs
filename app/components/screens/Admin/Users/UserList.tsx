import { FC } from 'react'

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useUsers } from './useUsers'

const UserList: FC = () => {
	const { searchTerm, handleSearch, isLoading, data, deleteAsync } = useUsers()

	return (
		<Meta title="Users">
			<AdminNavigation />
			<Heading title="Users" />
			<AdminHeader searchTerm={searchTerm} handleSearch={handleSearch} />
			<AdminTable
				headerItems={['Email', 'Date register']}
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default UserList
