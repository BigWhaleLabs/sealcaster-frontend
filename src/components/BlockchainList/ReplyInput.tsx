import { StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import CastBlock from 'components/Cast/CastBlock'
import useThread from 'hooks/useThread'
import walletStore from 'stores/WalletStore'

export default function ({
  placeholder,
  withHowItWorks,
}: {
  placeholder?: string
  withHowItWorks?: boolean
}) {
  const { account } = useSnapshot(walletStore)
  const data = useThread()

  if (!data) return null

  const { threadId } = data

  return (
    <CastBlock
      threadId={threadId}
      replyToId={threadId}
      placeHolder={placeholder}
      leftBlock={
        withHowItWorks || !account ? undefined : (
          <StatusText>
            Replying from {truncateMiddleIfNeeded(account, 12)}
          </StatusText>
        )
      }
    />
  )
}
