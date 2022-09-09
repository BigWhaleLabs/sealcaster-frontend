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
  truncate,
  truncateSize,
  eNSName,
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
  network,
  truncateSize,
  eNSName,
}: ENSAddressProps & { truncateSize: number }) {
  return (
    <Suspense fallback={truncateMiddleIfNeeded(address, truncateSize)}>
      <ENSAddressSuspended
        truncate
        address={address}
        network={network}
        truncateSize={truncateSize}
        eNSName={eNSName}
      />
    </Suspense>
  )
}

export default memo<ENSAddressProps & { truncateSize?: number }>(
  ({ address, network, truncateSize, eNSName }) => {
    // Used for gradient link. It won't work if we wrap it with a span
    if (truncateSize)
      return (
        <ENSAddress
          address={address}
          network={network}
          truncateSize={truncateSize}
          eNSName={eNSName}
        />
      )

    return (
      <>
        <span className={displayTo('md')}>
          <ENSAddress
            eNSName={eNSName}
            address={address}
            network={network}
            truncateSize={11}
          />
        </span>
        <span className={display(displayFrom('md'), 'lg:hidden')}>
          <ENSAddress
            eNSName={eNSName}
            address={address}
            network={network}
            truncateSize={17}
          />
        </span>
        <span className={displayFrom('lg')}>
          <ENSAddress
            eNSName={eNSName}
            address={address}
            network={network}
            truncateSize={25}
          />
        </span>
      </>
    )
  }
)
