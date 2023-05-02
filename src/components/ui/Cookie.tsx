import { AccentText, CookieText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import Button from 'components/ui/Button'
import NotificationStore from 'stores/NotificationStore'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  boxShadowColor,
  display,
  flexDirection,
  gap,
  inset,
  margin,
  maxWidth,
  padding,
  position,
  space,
  zIndex,
} from 'classnames/tailwind'

const basicCardStyles = classnames(
  display('flex'),
  flexDirection('flex-col'),
  position('fixed'),
  inset(
    'left-1',
    'right-1',
    'bottom-3',
    'sm:left-auto',
    'sm:right-5',
    'md:bottom-9'
  ),
  gap('gap-y-3', 'sm:gap-y-6'),
  backgroundColor('bg-primary-dark'),
  padding('p-4', 'sm:p-6'),
  borderRadius('rounded-2xl'),
  borderWidth('border'),
  borderColor('border-primary'),
  boxShadowColor('shadow-primary-semi-transparent'),
  maxWidth('max-w-full', 'sm:max-w-cookie'),
  zIndex('z-40')
)
const button = (small?: boolean) =>
  classnames(
    margin(small ? 'mx-auto' : 'mr-auto'),
    small ? display('sm:hidden') : display('hidden', 'sm:block')
  )

const CookieButton = ({
  callback,
  small,
}: {
  small?: boolean
  callback: () => void
}) => (
  <Button small={small} type="primary" onClick={callback}>
    Got it
  </Button>
)

export default function () {
  const { showCookie } = useSnapshot(NotificationStore)
  const closeCookie = () => (NotificationStore.showCookie = false)

  if (!showCookie) return null

  return (
    <div className={classNamesToString('shadow-card-glow', basicCardStyles)}>
      <div className={space('space-y-2')}>
        <AccentText color="text-primary">
          Yum<span className={padding('px-0.5')}>...</span>cookies! 🍪
        </AccentText>
        <CookieText>
          We use cookies for crucial functions but we don't track you
        </CookieText>
      </div>
      <div className={button(true)}>
        <CookieButton small callback={closeCookie} />
      </div>
      <div className={button()}>
        <CookieButton callback={closeCookie} />
      </div>
    </div>
  )
}
