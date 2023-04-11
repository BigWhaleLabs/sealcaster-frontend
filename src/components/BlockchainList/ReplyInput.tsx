import { StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import CastBlock from 'components/Cast/CastBlock'
import ReplyModel from 'models/ReplyModel'
import walletStore from 'stores/WalletStore'

export default function ({
  placeholder,
  replyToId,
  threadId,
}: {
  placeholder?: string
} & ReplyModel) {
  const { account } = useSnapshot(walletStore)

  return (
    <CastBlock
      placeHolder={placeholder}
      replyToId={replyToId}
      threadId={threadId}
      leftBlock={
        account ? (
          <StatusText>
            Replying from {truncateMiddleIfNeeded(account, 12)}
          </StatusText>
        ) : undefined
      }
    />
  )
}
