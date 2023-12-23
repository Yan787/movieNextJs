import { ChangeEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { ITableItem } from '@/ui/AdminTable/AdminTable/AdminTable.interface'

import { useDebounce } from '@/hooks/useDebounce'

import { UserService } from '@/services/userService'

import { convertMongoDate } from '@/utils/date/convertMongoDate'
import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/urlConfig'

export const useUsers = () => {
	const [searchTerm, setSearchTerm] = useState('')

	const debouncedSearch = useDebounce(searchTerm, 500)

	const queryData = useQuery(
		['user list', debouncedSearch],
		() => UserService.getAll(debouncedSearch),
		{
			select: ({ data }) =>
				data.map(
					(user): ITableItem => ({
						_id: user._id,
						editUrl: getAdminUrl(`user/edit/${user._id}`),
						items: [user.email, convertMongoDate(user.createdAt)],
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

	const { mutateAsync: deleteAsync } = useMutation(
		'delete user',
		(userId: string) => UserService.delete(userId),
		{
			onError: (error) => {
				toastError(error)
			},
			onSuccess() {
				toast.success('delete was successful')
				queryData.refetch()
			},
		},
	)

	return useMemo(
		() => ({
			handleSearch,
			searchTerm,
			...queryData,
			deleteAsync,
		}),
		[queryData, searchTerm, deleteAsync],
	)
}
