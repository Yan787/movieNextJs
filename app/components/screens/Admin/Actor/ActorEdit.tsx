import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation'
import formStyles from '@/ui/FormElements/AdminForm.module.scss'
import Button from '@/ui/FormElements/Button'
import Field from '@/ui/FormElements/Field'
import SlugField from '@/ui/FormElements/SlugField/SlugField'
import UploadField from '@/ui/FormElements/UploadField/UploadField'
import Heading from '@/ui/Heading/Heading'
import SkeletonLoader from '@/ui/SkeletonLoader'

import Meta from '@/utils/meta/Meta'
import { generateSlug } from '@/utils/string/generateSlug'

import { IActorEditInput } from './ActorEditInterface'
import { useActorEdit } from './useActorEdit'

const ActorEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IActorEditInput>({ mode: 'onChange' })

	const { onSubmit, isLoading } = useActorEdit(setValue)

	return (
		<Meta title="Edit actor">
			<AdminNavigation />
			<Heading title="Edit actor" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('name', {
									required: 'Name is required!',
								})}
								placeholder="Name"
								error={errors.name}
								style={{ width: '40%' }}
							/>
							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('name')))
								}
								register={register}
								error={errors.slug}
								style={{ width: '40%' }}
							/>
							<Controller
								name="photo"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										folder="actors"
										placeholder="Photo"
										value={value}
										onChange={onChange}
										error={error}
										style={{ width: '43%' }}
									/>
								)}
								rules={{
									required: 'Photo is required!',
								}}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default ActorEdit
