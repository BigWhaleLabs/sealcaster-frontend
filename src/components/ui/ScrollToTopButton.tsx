import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useCallback, useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import SimpleArrow from 'icons/SimpleArrow'
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
  margin,
  opacity,
  padding,
  pointerEvents,
  position,
  width,
  zIndex,
} from 'classnames/tailwind'
import useOnScroll from 'hooks/useOnScroll'

const scrollContainer = classnames(
  position('fixed'),
  inset('bottom-0', 'right-0'),
  width('w-fit'),
  margin('ml-auto', 'lg:mr-12'),
  display('flex'),
  flexDirection('flex-row'),
  padding('pt-4', 'pb-6', 'pr-5', 'md:pr-6', 'md:pb-8'),
  justifyContent('justify-end'),
  zIndex('z-30')
)
const arrowButton = (shown: boolean, fromMd?: boolean) =>
  classnames(
    fromMd ? displayFrom('md') : displayTo('md'),
    justifyContent('justify-center'),
    alignItems('items-center'),
    width('w-12', 'md:w-20'),
    height('h-12', 'md:h-20'),
    dropShadow('drop-shadow-primary-dimmed'),
    borderRadius('rounded-full'),
    opacity(shown ? 'opacity-60' : 'opacity-0', 'active:opacity-100'),
    pointerEvents({ 'pointer-events-none': !shown }),
    backgroundColor('bg-primary-dimmed')
  )
const arrowWrapper = (shown: boolean, fromMd?: boolean) =>
  classNamesToString(arrowButton(shown, fromMd), 'hover-button-scroll')

export default function () {
  const [visible, setVisible] = useState(false)
  const scrollToTop = () => window.scrollTo({ behavior: 'smooth', top: 0 })
  const onScroll = useCallback(() => {
    setVisible(document.documentElement.scrollTop > 150)
  }, [])
  useOnScroll(onScroll)

  return (
    <div className={scrollContainer}>
      <Button type="tertiary" onClick={scrollToTop}>
        <div className={arrowWrapper(visible, false)}>
          <SimpleArrow small />
        </div>
        <div className={arrowWrapper(visible, true)}>
          <SimpleArrow />
        </div>
      </Button>
    </div>
  )
}
