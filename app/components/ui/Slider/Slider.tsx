import { FC } from 'react'
import { CSSTransition } from 'react-transition-group'

import FavoriteButton from '@/screens/SingleMovie/FavoriteButton/FavoriteButton'

import { useAuth } from '@/hooks/useAuth'

import SlideArrow from './SlideArrow/SlideArrow'
import SlideItem from './SlideItem'
import styles from './Slider.module.scss'
import { ISlide } from './SliderInterface'
import { useSlider } from './useSlider'

interface ISlider {
	slides: ISlide[]
	buttonTitle?: string
}

const Slider: FC<ISlider> = ({ slides, buttonTitle }) => {
	const { slideIn, index, isNext, isPrev, handleClick } = useSlider(
		slides.length,
	)

	const { user } = useAuth()

	return (
		<div className={styles.slider}>
			<CSSTransition
				in={slideIn}
				classNames="slide-animation"
				timeout={300}
				unmountOnExit
			>
				<SlideItem slide={slides[index]} buttonTitle={buttonTitle} />
			</CSSTransition>

			{isPrev && (
				<SlideArrow variant="left" clickHandler={() => handleClick('Prev')} />
			)}
			{isNext && (
				<SlideArrow variant="right" clickHandler={() => handleClick('Next')} />
			)}
			{slides[index].bigPoster && user && (
				<FavoriteButton movieId={slides[index]._id} />
			)}
		</div>
	)
}

export default Slider
