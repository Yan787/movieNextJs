import { useRouter } from 'next/router'
import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ITableItem } from '@/ui/AdminTable/AdminTable/AdminTable.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { ActorService } from '@/services/actorService'

import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/urlConfig'

export const useActors = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['actor list', debouncedSearch],
		() => ActorService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(actor): ITableItem => ({
						_id: actor._id,
						editUrl: getAdminUrl(`actor/edit/${actor._id}`),
						items: [actor.name, String(actor.countMovies)],
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
		'create actor',
		() => ActorService.create(),
		{
			onSuccess({ data: _id }) {
				toast.success('create was successful')
				push(getAdminUrl(`actor/edit/${_id}`))
			},
			onError: (error) => {
				toastError(error)
			},
		},
	)

	const { mutateAsync: deleteAsync } = useMutation(
		'delete actor',
		(actorId: string) => ActorService.delete(actorId),
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
