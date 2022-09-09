import { AccentText } from 'components/Text'
import ENSAddress from 'components/ui/ENSAddress'
import Network from 'models/Network'

export default function ({
  account,
  needNetworkChange,
  eNSName,
  noWalletText = 'No wallet',
}: {
  account?: string
  needNetworkChange: boolean
  eNSName?: string
  noWalletText?: string
}) {
  const NotConnected = () =>
    needNetworkChange ? (
      <span>Change network</span>
    ) : (
      <span>{noWalletText}</span>
    )

  return (
    <AccentText
      extraSmall
      color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
    >
      {account ? (
        <ENSAddress
          address={account}
          network={Network.Goerli}
          eNSName={eNSName}
        />
      ) : (
        <NotConnected />
      )}
    </AccentText>
  )
}
