import { MovieService } from '@/services/movieService'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

export const useUpdateCountOpened = (slug: string) => {
	const { mutateAsync } = useMutation('update count opened', () =>
		MovieService.updateCountOpened(slug)
	)

	useEffect(() => {
		mutateAsync()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
}
