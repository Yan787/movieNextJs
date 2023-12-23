import { FC } from 'react'

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useGenres } from './useGenres'

const GenreList: FC = () => {
	const {
		searchTerm,
		handleSearch,
		isLoading,
		data,
		deleteAsync,
		createAsync,
	} = useGenres()

	return (
		<Meta title="Genres">
			<AdminNavigation />
			<Heading title="Genres" />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				headerItems={['Name', 'Slug']}
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default GenreList
