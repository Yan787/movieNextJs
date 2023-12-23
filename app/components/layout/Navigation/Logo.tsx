import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import logoImage from '@/assets/images/logo.svg'

const Logo: FC = () => {
	return (
		<Link href="https://t.me/YanSkvoroda" legacyBehavior>
			<a className="px-layout mb-10 block">
				<Image
					src={logoImage}
					width={247}
					height={34}
					alt="Online cine"
					draggable={false}
				/>
			</a>
		</Link>
	)
}

export default Logo
