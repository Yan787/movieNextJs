import dynamic from 'next/dynamic'
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

import { IMovieEditInput } from './MovieEditInterface'
import { useAdminActors } from './useAdminActors'
import { useAdminGenres } from './useAdminGenres'
import { useMovieEdit } from './useMovieEdit'

const DynamicSelect = dynamic(() => import('@/ui/Select/Select'), {
	ssr: false,
})

const MovieEdit: FC = () => {
	const {
		handleSubmit,
		register,
		formState: { errors },
		setValue,
		getValues,
		control,
	} = useForm<IMovieEditInput>({ mode: 'onChange' })

	const { onSubmit, isLoading } = useMovieEdit(setValue)

	const { data: genres, isLoading: isGenresLoading } = useAdminGenres()
	const { data: actors, isLoading: isActorsLoading } = useAdminActors()

	return (
		<Meta title="Edit movie">
			<AdminNavigation />
			<Heading title="Edit movie" />
			<form onSubmit={handleSubmit(onSubmit)} className={formStyles.form}>
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className={formStyles.fields}>
							<Field
								{...register('title', {
									required: 'Title is required!',
								})}
								placeholder="Title"
								error={errors.title}
								style={{ width: '44%' }}
							/>
							<SlugField
								generate={() =>
									setValue('slug', generateSlug(getValues('title')))
								}
								register={register}
								error={errors.slug}
								style={{ width: '44%' }}
							/>

							<Field
								{...register('parameters.country', {
									required: 'Country is required!',
								})}
								placeholder="Country"
								error={errors.parameters?.country}
								style={{ width: '29%' }}
							/>
							<Field
								{...register('parameters.duration', {
									required: 'Duration is required!',
								})}
								placeholder="Duration (min.)"
								error={errors.parameters?.duration}
								style={{ width: '29%' }}
							/>
							<Field
								{...register('parameters.year', {
									required: 'Year is required!',
								})}
								placeholder="Year"
								error={errors.parameters?.year}
								style={{ width: '29%' }}
							/>

							<Controller
								name="genres"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										placeholder="Genres"
										field={field}
										options={genres || []}
										isLoading={isGenresLoading}
										error={error}
										isMulti
										style={{ width: '44%' }}
									/>
								)}
								rules={{
									required: 'Please select at least one genre!',
								}}
							/>

							<Controller
								name="actors"
								control={control}
								render={({ field, fieldState: { error } }) => (
									<DynamicSelect
										placeholder="Actors"
										field={field}
										options={actors || []}
										isLoading={isActorsLoading}
										error={error}
										isMulti
										style={{ width: '44%' }}
									/>
								)}
								rules={{
									required: 'Please select at least one actor!',
								}}
							/>

							<Controller
								name="poster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										folder="movies"
										placeholder="Poster"
										value={value}
										onChange={onChange}
										error={error}
										style={{ width: '43%' }}
									/>
								)}
								rules={{
									required: 'Poster is required!',
								}}
							/>

							<Controller
								name="bigPoster"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										folder="movies"
										placeholder="Big poster"
										value={value}
										onChange={onChange}
										error={error}
										style={{ width: '43%' }}
									/>
								)}
								rules={{
									required: 'Big poster is required!',
								}}
							/>

							<Controller
								name="videoUrl"
								control={control}
								defaultValue=""
								render={({
									field: { value, onChange },
									fieldState: { error },
								}) => (
									<UploadField
										folder="movies"
										placeholder="Video"
										value={value}
										onChange={onChange}
										error={error}
										style={{ marginTop: -20 }}
										isNoImage
									/>
								)}
								rules={{
									required: 'Video is required!',
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

export default MovieEdit
