import { FC } from 'react'

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useActors } from './useActors'

const ActorList: FC = () => {
	const {
		searchTerm,
		handleSearch,
		isLoading,
		data,
		deleteAsync,
		createAsync,
	} = useActors()

	return (
		<Meta title="Actors">
			<AdminNavigation />
			<Heading title="Actors" />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				headerItems={['Name', 'Count movies']}
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default ActorList
