import { AccentText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import AccountAndLogo from 'components/navbar/AccountAndLogo'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Dropdown from 'components/Dropdown'
import LastDelimiter from 'components/ui/LastDelimiter'
import Logo from 'components/navbar/Logo'
import Network from 'models/Network'
import SealVerse from 'components/navbar/SealVerse'
import SocialLinks from 'components/navbar/SocialLinks'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  lineHeight,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'
import getWalletOption from 'helpers/getWalletOption'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-3', 'sm:gap-x-4'),
  cursor('cursor-pointer')
)
const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('xs:space-x-4', 'space-x-2'),
  cursor('cursor-pointer')
)
const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

const AccountContainer = ({
  account,
  onChangeNetwork,
  needNetworkChange,
  eNSName,
}: {
  account?: string
  onChangeNetwork?: () => Promise<void>
  needNetworkChange: boolean
  eNSName?: string
}) => {
  const [, setLocation] = useLocation()
  const { privateKey } = useSnapshot(BurnerWalletStore)

  const onSelectOption = (selectedValue: string) => {
    switch (selectedValue) {
      case 'disconnect':
        BurnerWalletStore.burn()
        setLocation('/')
        break
      case 'wallet':
        setLocation('/wallet')
        break
      default:
        account &&
          window.open(getEtherscanAddressUrl(account, Network.Goerli), '_blank')
    }
  }

  const content = (
    <div className={accountLinkContainer}>
      <AccountAndLogo
        needNetworkChange={needNetworkChange}
        account={account}
        eNSName={eNSName}
        connected={true}
      />
    </div>
  )

  if (account)
    return (
      <Dropdown
        extraSpacing
        fitToItemSize
        currentValue={window.location.origin}
        options={getWalletOption(!!privateKey)}
        staticPlaceholder={content}
        onChange={onSelectOption}
      />
    )

  return (
    <div className={accountLinkContainer} onClick={onChangeNetwork}>
      <AccountAndLogo
        eNSName={eNSName}
        needNetworkChange={needNetworkChange}
        connected={false}
      />
    </div>
  )
}

export default function ({
  account,
  needNetworkChange,
  eNSName,
}: {
  account?: string
  needNetworkChange: boolean
  eNSName?: string
}) {
  return (
    <div className={walletContainer}>
      <SocialLinks />
      <SealVerse />
      <LastDelimiter />

      <Suspense
        fallback={
          <div className={accountLinkContainer}>
            <div className={walletAccount}>
              <AccentText small color="text-primary-semi-dimmed">
                <span className={displayTo('lg')}>Fetching...</span>
                <span className={displayFrom('lg')}>Fetching account...</span>
              </AccentText>
            </div>
            <div className={width('w-fit')}>
              <Logo connected={false} />
            </div>
          </div>
        }
      >
        <AccountContainer
          eNSName={eNSName}
          needNetworkChange={needNetworkChange}
          account={account}
        />
      </Suspense>
    </div>
  )
}
