import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ITableItem } from '@/ui/AdminTable/AdminTable/AdminTable.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { GenreService } from '@/services/genreService'

import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/urlConfig'

export const useGenres = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['genre list', debouncedSearch],
		() => GenreService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(genre): ITableItem => ({
						_id: genre._id,
						editUrl: getAdminUrl(`genre/edit/${genre._id}`),
						items: [genre.name, genre.slug],
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
		'create genre',
		() => GenreService.create(),
		{
			onSuccess({ data: _id }) {
				toast.success('create was successful')
				push(getAdminUrl(`genre/edit/${_id}`))
			},
			onError: (error) => {
				toastError(error)
			},
		},
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete genre',
		(genreId: string) => GenreService.delete(genreId),
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
