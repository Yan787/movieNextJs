import { FC } from 'react'

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation'
import AdminHeader from '@/ui/AdminTable/AdminHeader/AdminHeader'
import AdminTable from '@/ui/AdminTable/AdminTable/AdminTable'
import Heading from '@/ui/Heading/Heading'

import Meta from '@/utils/meta/Meta'

import { useMovies } from './useMovies'

const MovieList: FC = () => {
	const {
		searchTerm,
		handleSearch,
		isLoading,
		data,
		deleteAsync,
		createAsync,
	} = useMovies()

	return (
		<Meta title="Movies">
			<AdminNavigation />
			<Heading title="Movies" />

			<AdminHeader
				searchTerm={searchTerm}
				handleSearch={handleSearch}
				onClick={createAsync}
			/>
			<AdminTable
				headerItems={['Title', 'Genres', 'Rating']}
				isLoading={isLoading}
				tableItems={data || []}
				removeHandler={deleteAsync}
			/>
		</Meta>
	)
}

export default MovieList
