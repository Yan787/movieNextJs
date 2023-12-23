import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'

import { GenreService } from '@/services/genreService'

import { toastError } from '@/utils/toastError'

import { getAdminUrl } from '@/config/urlConfig'

import { IGenreEditInput } from './GenreEditInterface'

export const useGenreEdit = (setValue: UseFormSetValue<IGenreEditInput>) => {
	const { query, push } = useRouter()
	const genreId = String(query.id)

	const { isLoading } = useQuery(
		['genre', genreId],
		() => GenreService.getById(genreId),
		{
			onSuccess({ data }) {
				setValue('name', data.name)
				setValue('slug', data.slug)
				setValue('icon', data.icon)
				setValue('description', data.description)
			},
			onError(error) {
				toastError(error)
			},
			enabled: !!query.id,
		},
	)

	const { mutateAsync } = useMutation(
		'update genre',
		(data: IGenreEditInput) => GenreService.update(genreId, data),
		{
			onSuccess() {
				toast.success('update was successful')
				push(getAdminUrl('genres'))
			},
			onError(error) {
				toastError(error)
			},
		},
	)

	const onSubmit: SubmitHandler<IGenreEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
