import { AccentText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Delimiter from 'components/ui/Delimiter'
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
  canReply,
  count,
  placeholder,
  replyText,
  replyToId,
  threadId,
}: {
  count?: number
  placeholder: string
  replyText?: string
} & ReplyModel) {
  const [inputOpen, setInputOpen] = useState(false)

  if (!replyToId) return null

  return (
    <>
      <Delimiter horizontal color="bg-divider" />

      <div className={replyButtonWrapper}>
        <Button
          disabled={!canReply}
          type="tertiary"
          onClick={() => setInputOpen(!inputOpen)}
        >
          {canReply && <ReplyIcon />}
          <AccentText small color="text-formal-accent">
            <span
              className={textColor(
                { 'text-accent': inputOpen },
                { 'hover:text-accent': canReply }
              )}
            >
              {replyText ? replyText : canReply ? 'Reply' : 'Replies'}
            </span>
          </AccentText>
          {count && (
            <AccentText extraSmall primary color="text-primary-semi-dimmed">
              ({count})
            </AccentText>
          )}
        </Button>
      </div>
      {inputOpen && (
        <ReplyInput
          placeholder={placeholder}
          replyToId={replyToId}
          threadId={threadId}
        />
      )}
    </>
  )
}
