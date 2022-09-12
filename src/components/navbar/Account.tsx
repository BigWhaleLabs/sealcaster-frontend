import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import ENSAddress from 'components/ui/ENSAddress'
import Network from 'models/Network'

export default function ({
  account,
  needNetworkChange,
  eNSName,
}: {
  account?: string
  needNetworkChange: boolean
  eNSName?: string
}) {
  const NotConnected = () =>
    needNetworkChange ? (
      <span>Change network</span>
    ) : (
      <>
        <span className={displayTo('lg')}>No wallet</span>
        <span className={displayFrom('lg')}>Connect burner wallet</span>
      </>
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
