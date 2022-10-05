import { AccentText, BodyText, StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Reply from 'icons/Reply'
import TextArea from 'components/ui/TextArea'
import TextareaInfo from 'components/Cast/TextareaInfo'
import classnames, {
  alignItems,
  display,
  gap,
  textColor,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const wrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-1')
)

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
  count,
  replyingTo,
}: {
  count: number
  replyingTo: string
}) {
  const { account } = useSnapshot(walletStore)
  const [text, setText] = useState('')
  const [inputOpen, setInputOpen] = useState(false)

  if (!account) return null

  return (
    <>
      <button className={wrapper} onClick={() => setInputOpen(!inputOpen)}>
        <Reply />
        <BodyText primary>
          <span className={textColor({ 'text-accent': inputOpen })}>Reply</span>
        </BodyText>
        <AccentText primary color="text-primary-semi-dimmed" extraSmall>
          ({count})
        </AccentText>
      </button>
      {inputOpen && (
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
      )}
    </>
  )
}
