import { FC } from 'react'

import styles from './Gallery.module.scss'
import { IGalleryItem } from './GalleryInterface'
import GalleryItem from './GalleryItem'

const Gallery: FC<{ items: IGalleryItem[] }> = ({ items }) => {
	return (
		<div className={styles.gallery}>
			{items.map((item) => (
				<GalleryItem key={item.link} item={item} variant="vertical" />
			))}
		</div>
	)
}

export default Gallery
