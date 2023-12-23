import { CSSProperties, FC } from 'react'
import { FieldError, UseFormRegister } from 'react-hook-form'

import Field from '../Field'

import styles from './SlugField.module.scss'

interface ISlugField {
	register: UseFormRegister<any>
	error?: FieldError
	generate: () => void
	style?: CSSProperties
}

const SlugField: FC<ISlugField> = ({ register, error, generate, style }) => {
	return (
		<div className="relative" style={style}>
			<Field
				{...register('slug', {
					required: 'Slug is required!',
				})}
				placeholder="Slug"
				error={error}
			/>
			<div className={styles.badge} onClick={generate}>
				generate
			</div>
		</div>
	)
}

export default SlugField
