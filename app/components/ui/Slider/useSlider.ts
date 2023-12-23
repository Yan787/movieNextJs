import { useState } from "react"

export const useSlider = (length: number) => {
    const [currentInd, setCurrentInd] = useState(0)
    const [slideIn, setSlideIn] = useState(true)

    const isExistsNext = currentInd + 1 < length
    const isExistsPrev = currentInd ? currentInd - 1 < length : false

    const handleArrowClick = (direction: 'Next' | 'Prev') => {
        const newIndex = direction === 'Next' ? currentInd + 1 : currentInd -1
        setSlideIn(false)

        setTimeout(()=> {
            setCurrentInd(newIndex)
            setSlideIn(true)
        }, 300)
    }

    return {
        index: currentInd,
		slideIn,
        isNext: isExistsNext,
        isPrev: isExistsPrev,
		handleClick: handleArrowClick,
	}
}
