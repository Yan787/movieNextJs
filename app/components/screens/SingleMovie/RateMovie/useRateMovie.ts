import { useAuth } from "@/hooks/useAuth"
import { RatingService } from "@/services/ratingService"
import { toastError } from "@/utils/toastError"
import { useState } from "react"
import { useMutation, useQuery } from "react-query"

export const useRateMovie = (movieId: string) => {
    const [rating, setRating] = useState(0)
	const [isSended, setIsSended] = useState(false)

	const { user } = useAuth()

    const { refetch } = useQuery(
		['your movie rating', movieId],
		() => RatingService.getByUserMovie(movieId),
		{
			onSuccess({ data }) {
				setRating(data)
			},
			enabled: !!movieId && !!user
		}
	)

    const { mutateAsync: rateMovie } = useMutation(
		'set rating movie',
		({ value }: { value: number }) => RatingService.setRating(movieId, value),
		{
            onSuccess() {
				setIsSended(true)
				refetch()
                
				setTimeout(() => {
                    setIsSended(false)
				}, 2400)
			},
            onError(error) {
                toastError(error, 'Rate movie')
            }
		}
	)

    const handleClick = async (nextValue: number) => {
		setRating(nextValue)
		await rateMovie({ value: nextValue })
	}

    return {
		isSended,
		rating,
		handleClick,
	}
}