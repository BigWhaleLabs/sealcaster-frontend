import { Suspense, memo } from 'react'
import { display } from 'classnames/tailwind'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Network from 'models/Network'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'

interface ENSAddressProps {
  address: string
  network: Network
  eNSName?: string
}

function ENSAddressSuspended({
  address,
  eNSName,
  truncate,
  truncateSize,
}: ENSAddressProps & {
  truncate?: boolean
  truncateSize: number
}) {
  return (
    <>
      {truncate
        ? truncateMiddleIfNeeded(eNSName || address, truncateSize)
        : eNSName || truncateMiddleIfNeeded(address, truncateSize)}
    </>
  )
}

function ENSAddress({
  address,
  eNSName,
  network,
  truncateSize,
}: ENSAddressProps & { truncateSize: number }) {
  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, truncateSize)}>
      <ENSAddressSuspended
        truncate
        address={address}
        eNSName={eNSName}
        network={network}
        truncateSize={truncateSize}
      />
    </Suspense>
  )
}

export default memo<ENSAddressProps & { truncateSize?: number }>(
  ({ address, eNSName, network, truncateSize }) => {
    // Used for gradient link. It won't work if we wrap it with a span
    if (truncateSize)
      return (
        <ENSAddress
          address={address}
          eNSName={eNSName}
          network={network}
          truncateSize={truncateSize}
        />
      )

    return (
      <>
        <span className={displayTo('md')}>
          <ENSAddress
            address={address}
            eNSName={eNSName}
            network={network}
            truncateSize={11}
          />
        </span>
        <span className={display(displayFrom('md'), 'lg:hidden')}>
          <ENSAddress
            address={address}
            eNSName={eNSName}
            network={network}
            truncateSize={17}
          />
        </span>
        <span className={displayFrom('lg')}>
          <ENSAddress
            address={address}
            eNSName={eNSName}
            network={network}
            truncateSize={25}
          />
        </span>
      </>
    )
  }
)
