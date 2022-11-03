import { Suspense } from 'preact/compat'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import AccountAndLogo from 'components/navbar/AccountAndLogo'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Delimiter from 'components/ui/Delimiter'
import Dropdown from 'components/Dropdown'
import NavLoading from 'components/navbar/NavLoading'
import Network from 'models/Network'
import SealVerse from 'components/navbar/SealVerse'
import SocialLinks from 'components/navbar/SocialLinks'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  gap,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'
import getWalletOption from 'helpers/getWalletOption'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-3', 'sm:gap-x-4'),
  cursor('cursor-pointer'),
  displayFrom('xs')
)
const accountLinkContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('xs:space-x-4', 'space-x-2'),
  cursor('cursor-pointer')
)

interface AccountProps {
  account?: string
  needNetworkChange: boolean
  eNSName?: string
}

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
        setLocation('#/')
        break
      case 'wallet':
        setLocation('#/wallet')
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

const SuspendedAccount = ({
  account,
  needNetworkChange,
  eNSName,
}: AccountProps) => {
  return (
    <Suspense
      fallback={
        <div className={accountLinkContainer}>
          <NavLoading />
        </div>
      }
    >
      <AccountContainer
        eNSName={eNSName}
        needNetworkChange={needNetworkChange}
        account={account}
      />
    </Suspense>
  )
}

export default function ({
  account,
  needNetworkChange,
  eNSName,
}: AccountProps) {
  return (
    <>
      <div className={walletContainer}>
        <SocialLinks />
        <SealVerse />
        <div className={displayFrom('xs')}>
          <Delimiter />
        </div>
        <SuspendedAccount
          account={account}
          needNetworkChange={needNetworkChange}
          eNSName={eNSName}
        />
      </div>

      <div className={displayTo('xs')}>
        <SuspendedAccount
          account={account}
          needNetworkChange={needNetworkChange}
          eNSName={eNSName}
        />
      </div>
      <div className={displayTo('xs')}>
        <SealVerse />
      </div>
    </>
  )
}
