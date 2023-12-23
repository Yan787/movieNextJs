import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'

import AdminNavigation from '@/ui/AdminNavigation/AdminNavigation'
import Button from '@/ui/FormElements/Button'
import Field from '@/ui/FormElements/Field'
import Heading from '@/ui/Heading/Heading'
import SkeletonLoader from '@/ui/SkeletonLoader'

import { validEmail } from '@/shared/regex'

import Meta from '@/utils/meta/Meta'

import { IUserEditInput } from './UserEditInterface'
import { useUserEdit } from './useUserEdit'

const UserEdit: FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		control,
	} = useForm<IUserEditInput>({
		mode: 'onChange',
	})

	const { isLoading, onSubmit } = useUserEdit(setValue)

	return (
		<Meta title="Edit user">
			<AdminNavigation />
			<Heading title="Edit user" />
			<form onSubmit={handleSubmit(onSubmit)} className="admin-form">
				{isLoading ? (
					<SkeletonLoader count={3} />
				) : (
					<>
						<div className="flex items-center flex-wrap justify-between mt-12">
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
								style={{ width: '34%' }}
							/>
							<Field
								{...register('password')}
								placeholder="Password"
								type="password"
								error={errors.password}
								style={{ width: '34%' }}
							/>
							<Controller
								control={control}
								name="isAdmin"
								render={({ field }) => (
									<button
										onClick={(e) => {
											e.preventDefault()
											field.onChange(!field.value)
										}}
										className="block mb-7 bg-gray-500 py-2 rounded-xl w-48"
									>
										{field.value ? 'Make it regular user' : 'Make it admin'}
									</button>
								)}
							/>
						</div>
						<Button>Update</Button>
					</>
				)}
			</form>
		</Meta>
	)
}

export default UserEdit
