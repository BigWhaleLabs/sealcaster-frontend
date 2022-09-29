import { LinkText, StatusText } from 'components/ui/Text'
import getEtherscanTxUrl from 'helpers/network/getEtherscanTxUrl'

export default function ({ tx }: { tx: string }) {
  return (
    <StatusText primary>
      <LinkText extraSmall title={tx} url={getEtherscanTxUrl(tx)}>
        Etherscan
      </LinkText>
    </StatusText>
  )
}
