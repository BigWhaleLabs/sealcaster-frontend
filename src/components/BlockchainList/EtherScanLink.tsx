import { LinkText, StatusText } from 'components/ui/Text'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

export default function ({ address }: { address: string }) {
  return (
    <StatusText primary>
      <LinkText
        extraSmall
        title={address}
        url={getEtherscanAddressUrl(address)}
      >
        Etherscan
      </LinkText>
    </StatusText>
  )
}
