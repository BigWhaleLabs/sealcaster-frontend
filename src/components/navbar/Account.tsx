import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useLocation } from 'wouter'
import ENSAddress from 'components/ui/ENSAddress'
import Network from 'models/Network'
import walletStore from 'stores/WalletStore'

export default function ({
  account,
  needNetworkChange,
  eNSName,
}: {
  account?: string
  needNetworkChange: boolean
  eNSName?: string
}) {
  const [location, setLocation] = useLocation()

  const NotConnected = () =>
    needNetworkChange ? (
      <span>Change network</span>
    ) : (
      <div
        onClick={async () => {
          await walletStore.connect(true)
          if ((await walletStore.isBurnedWallet) && location !== '/cast')
            setLocation('/cast')
        }}
      >
        <span className={displayTo('lg')}>No wallet</span>
        <span className={displayFrom('lg')}>Connect burner wallet</span>
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
          network={Network.Goerli}
          eNSName={eNSName}
        />
      ) : (
        <NotConnected />
      )}
    </AccentText>
  )
}
