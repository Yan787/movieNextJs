import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'

import { IMovieEditInput } from './MovieEditInterface'
import { MovieService } from '@/services/movieService'
import { toastError } from '@/utils/toastError'
import { toast } from 'react-toastify'
import { getAdminUrl } from '@/config/urlConfig'

export const useMovieEdit = (setValue: UseFormSetValue<IMovieEditInput>) => {
	const { query, push } = useRouter()
	const movieId = String(query.id)

	const { isLoading } = useQuery(
		['movie', movieId],
		() => MovieService.getById(movieId),
		{
			onSuccess({ data }) {
				setValue('title', data.title)
				setValue('slug', data.slug)
				setValue('parameters.country', data.parameters?.country)
				setValue('parameters.duration', data.parameters?.duration)
				setValue('parameters.year', data.parameters?.year)
				setValue('genres', data.genres)
				setValue('actors', data.actors)
				setValue('poster', data.poster)
				setValue('bigPoster', data.bigPoster)
				setValue('videoUrl', data.videoUrl)
			},
			onError(error) {
				toastError(error)
			},
			enabled: !!query.id,
		}
	)

	const { mutateAsync } = useMutation(
		'update movie',
		(data: IMovieEditInput) => MovieService.update(movieId, data),
		{
            onSuccess() {
                toast.success('update was successful')
				push(getAdminUrl('movies'))
			},
			onError(error) {
				toastError(error)
			},
		}
	)

	const onSubmit: SubmitHandler<IMovieEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
