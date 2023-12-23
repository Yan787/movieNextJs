import Head from 'next/head'
import NextProgressBar from 'nextjs-progressbar'
import { FC, ReactNode } from 'react'

import { accentColor } from '@/config/constants'

import Favicons from './Favicons'

const HeadProvider: FC<{ children: ReactNode }> = ({ children }) => {
	return (
		<>
			<NextProgressBar
				color={accentColor}
				startPosition={0.3}
				stopDelayMs={200}
				height={3}
			/>
			<Head>
				<meta charSet="UTF-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=5"
				/>

				<Favicons />

				<meta name="theme-color" content={'#181B1E'} />
				<meta name="msapplication-navbutton-color" content={'#181B1E'} />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content={'#1e1818'}
				/>
			</Head>
			{children}
		</>
	)
}

export default HeadProvider
