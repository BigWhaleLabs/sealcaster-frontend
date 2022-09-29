import { Link } from 'wouter'
import { LogoSubText, LogoText } from 'components/ui/Text'
import { Player } from '@lottiefiles/react-lottie-player'
import { VNode } from 'preact'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useCallback, useMemo, useRef, useState } from 'preact/hooks'
import AnimatedLogo from 'icons/AnimatedLogo'
import RightBlock from 'components/navbar/RightBlock'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  width,
  zIndex,
} from 'classnames/tailwind'

const navbar = (visible?: boolean, withoutRightBlock?: boolean) =>
  classnames(
    position('sticky'),
    inset('top-0'),
    display('flex'),
    alignItems('items-center'),
    justifyContent(withoutRightBlock ? 'sm:justify-center' : 'justify-between'),
    padding('py-4', 'sm:py-6', 'px-6', 'lg:px-24'),
    space('xs:space-x-4', 'sm:space-x-9', 'lg:space-x-0'),
    zIndex('z-40'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all'),
    margin('mb-8')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center')
)

const logoWithVersion = classnames(
  display('flex'),
  flexDirection('flex-col'),
  displayFrom('md')
)

const logoWrapper = classnames(display('flex'), width('w-full'))

export default function ({
  logoText,
  account,
  needNetworkChange,
  eNSName,
  hideWalletPart,
}: {
  logoText: VNode | string
  account?: string
  needNetworkChange: boolean
  eNSName?: string
  hideWalletPart?: boolean
}) {
  const lottieRef = useRef<Player>()
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  useMemo(() => {
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [onScroll])

  return (
    <nav className={navbar(backgroundVisible, hideWalletPart)}>
      <Link to="/" className={classNamesToString(logoContainer)}>
        <div
          className={logoWrapper}
          onTouchStart={() => {
            lottieRef.current?.play()
          }}
        >
          <Player ref={lottieRef} hover src={AnimatedLogo} />
        </div>
        <div className={logoWithVersion}>
          {typeof logoText === 'string' ? (
            <>
              <LogoText>{logoText}</LogoText>
              <LogoSubText>(ALPHA)</LogoSubText>
            </>
          ) : (
            { logoText }
          )}
        </div>
      </Link>
      {!hideWalletPart && (
        <RightBlock
          eNSName={eNSName}
          needNetworkChange={needNetworkChange}
          account={account}
        />
      )}
    </nav>
  )
}
