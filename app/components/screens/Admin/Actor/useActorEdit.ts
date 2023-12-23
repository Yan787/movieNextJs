import { getAdminUrl } from '@/config/urlConfig'
import { ActorService } from '@/services/actorService'
import { toastError } from '@/utils/toastError'
import { useRouter } from 'next/router'
import { SubmitHandler, UseFormSetValue } from 'react-hook-form'
import { useMutation, useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { IActorEditInput } from './ActorEditInterface'

export const useActorEdit = (setValue: UseFormSetValue<IActorEditInput>) => {
	const { query, push } = useRouter()
	const actorId = String(query.id)

	const { isLoading } = useQuery(
		['actor', actorId],
		() => ActorService.getById(actorId),
		{
			onSuccess({ data }) {
				setValue('name', data.name)
				setValue('photo', data.photo)
				setValue('slug', data.slug)
			},
			onError(error) {
				toastError(error)
			},
			enabled: !!query.id,
		},
	)

	const { mutateAsync } = useMutation(
		'update actor',
		(data: IActorEditInput) => ActorService.update(actorId, data),
		{
			onSuccess() {
				toast.success('update was successful')
				push(getAdminUrl('actors'))
			},
			onError(error) {
				toastError(error)
			},
		}
	)

	const onSubmit: SubmitHandler<IActorEditInput> = async (data) => {
		await mutateAsync(data)
	}

	return { onSubmit, isLoading }
}
