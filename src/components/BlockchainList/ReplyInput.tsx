import { Button } from '@material-tailwind/react'
import { StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import TextArea from 'components/ui/TextArea'
import TextareaInfo from 'components/Cast/TextareaInfo'
import walletStore from 'stores/WalletStore'

const LeftBlock = ({ account }: { account: string }) => {
  return (
    <StatusText>Replying from {truncateMiddleIfNeeded(account, 12)}</StatusText>
  )
}

const RightBlock = () => {
  return (
    <Button type="primary" small center>
      Cast to reply
    </Button>
  )
}

export default function ({
  replyingTo,
  inputOpen,
}: {
  replyingTo: string
  inputOpen: boolean
}) {
  const { account } = useSnapshot(walletStore)
  if (!account || !inputOpen) return null

  const [text, setText] = useState('')

  return (
    <>
      <TextArea
        text={text}
        placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
        onTextChange={setText}
        maxLength={280}
      />
      <TextareaInfo
        leftBlock={<LeftBlock account={account} />}
        rightBlock={<RightBlock />}
      />
    </>
  )
}
