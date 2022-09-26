import { LinkText, StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import useAccount from 'hooks/useAccount'

export default function ({ sender }: { sender: string }) {
  const { account } = useAccount()
  return (
    <StatusText primary>
      <LinkText extraSmall title={sender} url={getEtherscanAddressUrl(sender)}>
        {sender === account ? 'you' : truncateMiddleIfNeeded(sender, 13)}
      </LinkText>
    </StatusText>
  )
}
