import { VNode } from 'preact'
import { useCallback, useState } from 'preact/hooks'
import RightBlock from 'components/navbar/RightBlock'
import SiteLogo from 'components/navbar/SiteLogo'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  space,
  transitionProperty,
  zIndex,
} from 'classnames/tailwind'
import useOnScroll from 'hooks/useOnScroll'

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
  const [backgroundVisible, setBackgroundVisible] = useState(false)
  const onScroll = useCallback(() => {
    setBackgroundVisible(window.scrollY > 20)
  }, [])
  useOnScroll(onScroll)

  return (
    <nav className={navbar(backgroundVisible, hideWalletPart)}>
      <SiteLogo logoText={logoText} />
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
