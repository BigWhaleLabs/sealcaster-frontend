import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import ENSAddress from 'components/ui/ENSAddress'
import Network from 'models/Network'
import walletStore from 'stores/WalletStore'

export default function ({
  account,
  eNSName,
  needNetworkChange,
}: {
  account?: string
  needNetworkChange: boolean
  eNSName?: string
}) {
  const NotConnected = () => (
    <div
      onClick={async () => {
        await walletStore.connect({
          checkNetwork: true,
          clearCachedProvider: true,
        })
      }}
    >
      {needNetworkChange ? (
        <span>Change network</span>
      ) : (
        <>
          <span className={displayTo('lg')}>No wallet</span>
          <span className={displayFrom('lg')}>Connect burner wallet</span>
        </>
      )}
    </div>
  )

  return (
    <AccentText
      small
      color={account ? 'text-accent' : 'text-primary-semi-dimmed'}
    >
      {account ? (
        <ENSAddress
          address={account}
          eNSName={eNSName}
          network={Network.Goerli}
        />
      ) : (
        <NotConnected />
      )}
    </AccentText>
  )
}
