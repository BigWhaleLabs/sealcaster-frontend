import { Link } from 'wouter'
import { LogoSubText, LogoText } from 'components/ui/Text'
import { Player } from '@lottiefiles/react-lottie-player'
import { VNode } from 'preact'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useRef } from 'preact/hooks'
import AnimatedLogo from 'icons/AnimatedLogo'
import classNamesToString from 'helpers/classNamesToString'
import classnames, {
  alignItems,
  display,
  flexDirection,
  maxWidth,
  width,
} from 'classnames/tailwind'

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center')
)

const logoWithVersion = classnames(
  display('flex'),
  flexDirection('flex-col'),
  displayFrom('md')
)

const logoWrapper = classnames(
  display('flex'),
  maxWidth('max-w-14'),
  width('w-full')
)

export default function ({ logoText }: { logoText: VNode | string }) {
  const lottieRef = useRef<Player>()

  return (
    <Link className={classNamesToString(logoContainer)} href="#/">
      <div
        className={logoWrapper}
        onTouchStart={() => {
          lottieRef.current?.play()
        }}
      >
        <Player hover ref={lottieRef} src={AnimatedLogo} />
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
  )
}
