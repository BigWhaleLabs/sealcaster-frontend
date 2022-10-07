import { StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import CastBlock from 'components/Cast/CastBlock'
import walletStore from 'stores/WalletStore'

export default function ({
  placeholder,
  withHowItWorks,
}: {
  placeholder?: string
  withHowItWorks?: boolean
}) {
  const { account } = useSnapshot(walletStore)

  if (!account) return null

  return (
    <CastBlock
      placeHolder={placeholder}
      leftBlock={
        withHowItWorks ? undefined : (
          <StatusText>
            Replying from {truncateMiddleIfNeeded(account, 12)}
          </StatusText>
        )
      }
    />
  )
}
