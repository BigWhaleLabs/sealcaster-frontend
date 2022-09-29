import { LinkText, StatusText } from 'components/ui/Text'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import getEtherscanTxUrl from 'helpers/getEtherscanTxUrl'

export default function ({ address, tx }: { address?: string; tx?: string }) {
  let url: string

  if (tx) {
    url = getEtherscanTxUrl(tx)
  } else if (address) {
    url = getEtherscanAddressUrl(address)
  } else {
    return null
  }

  return (
    <StatusText primary>
      <LinkText extraSmall title={address || tx} url={url}>
        {address ? 'Etherscan' : 'Transaction'}
      </LinkText>
    </StatusText>
  )
}
