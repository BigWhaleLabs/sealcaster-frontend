import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useEffect, useState } from 'preact/hooks'
import ArrowUp from 'icons/ArrowUp'
import Button from 'components/ui/Button'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  dropShadow,
  flexDirection,
  height,
  inset,
  justifyContent,
  padding,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'

const scrollContainer = classnames(
  position('sticky'),
  inset('bottom-0'),
  width('w-full'),
  display('flex'),
  flexDirection('flex-row'),
  padding('p-4'),
  justifyContent('justify-end'),
  zIndex('z-30')
)
const arrowButton = (fromMd?: boolean) =>
  classnames(
    fromMd ? displayFrom('md') : displayTo('md'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    width('w-12', 'md:w-20'),
    height('h-12', 'md:h-20'),
    dropShadow('active:drop-shadow-primary'),
    borderRadius('rounded-full'),
    backgroundColor('bg-primary')
  )
const arrowWrapper = (fromMd?: boolean) =>
  classNamesToString(arrowButton(fromMd), 'hover-button-scroll')

export default function () {
  const [visible, setVisible] = useState(false)
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const onScroll = () => {
    setVisible(document.documentElement.scrollTop > 150)
  }
  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return visible ? (
    <div className={scrollContainer}>
      <Button type="tertiary" onClick={scrollToTop}>
        <div className={arrowWrapper(false)}>
          <ArrowUp small />
        </div>
        <div className={arrowWrapper(true)}>
          <ArrowUp />
        </div>
      </Button>
    </div>
  ) : null
}
