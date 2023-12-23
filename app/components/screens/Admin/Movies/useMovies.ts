import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ITableItem } from '@/ui/AdminTable/AdminTable/AdminTable.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { MovieService } from '@/services/movieService'

import { getGenresList } from '@/utils/movie/getGenresList'
import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/urlConfig'

export const useMovies = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['movie list', debouncedSearch],
		() => MovieService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(movie): ITableItem => ({
						_id: movie._id,
						editUrl: getAdminUrl(`movie/edit/${movie._id}`),
						items: [
							movie.title,
							getGenresList(movie.genres),
							String(movie.rating),
						],
					}),
				),
			onError: (error) => {
				toastError(error)
			},
		},
	)

	const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	const { push } = useRouter()

	const { mutateAsync: createAsync } = useMutation(
		'create movie',
		() => MovieService.create(),
		{
			onSuccess({ data: _id }) {
				toast.success('create was successful')
				push(getAdminUrl(`movie/edit/${_id}`))
			},
			onError: (error) => {
				toastError(error)
			},
		},
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete movie',
		(movieId: string) => MovieService.delete(movieId),
		{
			onSuccess() {
				toast.success('delete was successful')
				queryData.refetch()
			},
			onError: (error) => {
				toastError(error)
			},
		},
	)

	return useMemo(
		() => ({
			handleSearch,
			searchTerm,
			...queryData,
			deleteAsync,
			createAsync,
		}),
		[queryData, searchTerm, deleteAsync, createAsync],
	)
}
