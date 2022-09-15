import { displayFrom } from 'helpers/visibilityClassnames'
import AccountAndLogo from 'components/navbar/AccountAndLogo'
import ExternalLink from 'components/ui/ExternalLink'
import Network from 'models/Network'
import SealVerse from 'components/navbar/SealVerse'
import SocialLinks from 'components/navbar/SocialLinks'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  flexDirection,
  gap,
  height,
  space,
  width,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/network/getEtherscanAddressUrl'

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
const delimiterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)
const lastDelimiterContainer = classnames(delimiterContainer, displayFrom('xs'))

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
  if (account)
    return (
      <ExternalLink url={getEtherscanAddressUrl(account, Network.Goerli)}>
        <div className={accountLinkContainer}>
          <AccountAndLogo
            needNetworkChange={needNetworkChange}
            account={account}
            eNSName={eNSName}
            connected={true}
          />
        </div>
      </ExternalLink>
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
      <hr className={lastDelimiterContainer} />

      <AccountContainer
        eNSName={eNSName}
        needNetworkChange={needNetworkChange}
        account={account}
      />
    </div>
  )
}
