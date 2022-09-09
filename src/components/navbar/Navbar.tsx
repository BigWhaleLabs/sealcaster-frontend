import { LogoText } from 'components/Text'
import { VNode } from 'preact'
import { displayFrom } from 'helpers/visibilityClassnames'
import { useCallback, useMemo, useState } from 'react'
import RightBlock from 'components/navbar/RightBlock'
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
    padding('py-6', 'px-24'),
    space('xs:space-x-4', 'sm:space-x-9', 'lg:space-x-0'),
    zIndex('z-50'),
    backgroundColor(visible ? 'bg-primary-dark' : 'bg-transparent'),
    transitionProperty('transition-all'),
    margin('mb-8')
  )

const logoContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('sm:space-x-4', 'space-x-1'),
  margin('mt-2')
)

const logoWithVersion = classnames(
  display('flex'),
  flexDirection('flex-col'),
  displayFrom('md')
)

const logoWrapper = classnames(display('flex'), width('w-full'))

export default function ({
  logo,
  logoText,
  account,
  needNetworkChange,
  eNSName,
  hideWalletPart,
  noWalletText,
}: {
  logo: VNode
  logoText: VNode | string
  account?: string
  needNetworkChange: boolean
  eNSName?: string
  hideWalletPart?: boolean
  noWalletText?: string
}) {
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
      <>
        <div className={logoContainer}>
          <div className={logoWrapper}>{logo}</div>
          <div className={logoWithVersion}>
            {typeof logoText === 'string' ? (
              <LogoText>{logoText}</LogoText>
            ) : (
              { logoText }
            )}
          </div>
        </div>
      </>
      {!hideWalletPart && (
        <RightBlock
          eNSName={eNSName}
          needNetworkChange={needNetworkChange}
          account={account}
          noWalletText={noWalletText}
        />
      )}
    </nav>
  )
}
