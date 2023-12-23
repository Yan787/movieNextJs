import cn from 'classnames'
import { FC, useEffect, useState } from 'react'
import { useMutation } from 'react-query'

import { useRenderClient } from '@/hooks/useRenderClient'

import { UserService } from '@/services/userService'

import { toastError } from '@/utils/toastError'

import { useFavorites } from '../../Favorites/useFavorites'

import styles from './FavoriteButton.module.scss'

const FavoriteButton: FC<{ movieId: string }> = ({ movieId }) => {
	const [isSmashed, setIsSmashed] = useState(false)

	const { favoritesMovies, refetch } = useFavorites()
	const { isRenderClient } = useRenderClient()

	useEffect(() => {
		if (!favoritesMovies) return
		const isHasMovie = favoritesMovies.some((f) => f._id === movieId)
		if (isSmashed !== isHasMovie) setIsSmashed(isHasMovie)
	}, [favoritesMovies, isSmashed, movieId])

	const { mutateAsync } = useMutation(
		'update favorites',
		() => UserService.toggleFavorite(movieId),
		{
			onSuccess() {
				setIsSmashed(!isSmashed)
				refetch()
			},
			onError(error) {
				toastError(error)
			},
		},
	)
	if (isRenderClient) {
		return (
			<button
				onClick={() => mutateAsync()}
				className={cn(styles.button, {
					[styles.animate]: isSmashed,
				})}
				style={{ backgroundImage: `url(${'/heart-animation.png'})` }}
			></button>
		)
	} else return null
}

export default FavoriteButton
