import { AccentText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import ReplyIcon from 'icons/ReplyIcon'
import ReplyInput from 'components/BlockchainList/ReplyInput'
import ReplyModel from 'models/ReplyModel'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  textColor,
} from 'classnames/tailwind'

const replyButtonWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  gap('gap-x-1')
)

export default function ({
  count,
  placeholder,
  replyText,
  threadId,
  replyToId,
  isThreadOwned,
}: {
  count: number
  placeholder: string
  isThreadOwned: boolean
  replyText?: string
} & ReplyModel) {
  const [inputOpen, setInputOpen] = useState(false)

  if (!replyToId) return null

  return (
    <>
      <div className={replyButtonWrapper}>
        <Button
          type="tertiary"
          onClick={() => setInputOpen(!inputOpen)}
          disabled={!isThreadOwned}
        >
          {isThreadOwned && <ReplyIcon />}
          <AccentText small color="text-formal-accent">
            <span
              className={textColor(
                { 'text-accent': inputOpen },
                { 'hover:text-accent': isThreadOwned }
              )}
            >
              {replyText ? replyText : isThreadOwned ? 'Reply' : 'Replies'}
            </span>
          </AccentText>
          <AccentText primary color="text-primary-semi-dimmed" extraSmall>
            ({count})
          </AccentText>
        </Button>
      </div>
      {inputOpen && (
        <ReplyInput
          threadId={threadId}
          replyToId={replyToId}
          placeholder={placeholder}
        />
      )}
    </>
  )
}
