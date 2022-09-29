import { LinkText, StatusText } from 'components/ui/Text'
import getEtherscanTxUrl from 'helpers/getEtherscanTxUrl'

export default function ({ tx }: { tx: string }) {
  return (
    <StatusText primary>
      <LinkText extraSmall title={tx} url={getEtherscanTxUrl(tx)}>
        Etherscan
      </LinkText>
    </StatusText>
  )
}
