import { FC } from 'react'
import { useForm } from 'react-hook-form'

import Button from '@/ui/FormElements/Button'
import Field from '@/ui/FormElements/Field'
import Heading from '@/ui/Heading/Heading'
import SkeletonLoader from '@/ui/SkeletonLoader'

import { validEmail } from '@/shared/regex'

import Meta from '@/utils/meta/Meta'

import styles from './Profile.module.scss'
import { IProfileInput } from './ProfileInterface'
import { useProfile } from './useProfile'

const Profile: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm<IProfileInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useProfile(setValue)

	return (
		<Meta title="Profile">
			<Heading title="Profile" />
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				{isLoading ? (
					<SkeletonLoader count={2} />
				) : (
					<div className="flex items-center flex-wrap justify-between">
						<Field
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: validEmail,
									message: 'Please enter a valid email',
								},
							})}
							placeholder="E-mail"
							error={errors.email}
							style={{ width: '44%' }}
						/>
						<Field
							{...register('password', {
								required: 'Password is required!',
								minLength: {
									value: 6,
									message: 'Min length should more 6 symbols!',
								},
							})}
							placeholder="Password"
							type="password"
							error={errors.password}
							style={{ width: '44%' }}
						/>
					</div>
				)}

				<Button className={styles.button}>Update</Button>
			</form>
		</Meta>
	)
}

export default Profile
