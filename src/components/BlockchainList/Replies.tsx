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
}: {
  count: number
  placeholder: string
  replyText?: string
} & ReplyModel) {
  const [inputOpen, setInputOpen] = useState(false)

  return (
    <>
      <Button type="tertiary" onClick={() => setInputOpen(!inputOpen)}>
        <div className={replyButtonWrapper}>
          <ReplyIcon />
          <AccentText small color="text-formal-accent">
            <span className={textColor({ 'text-accent': inputOpen })}>
              {replyText ? replyText : 'Reply'}
            </span>
          </AccentText>
          <AccentText primary color="text-primary-semi-dimmed" extraSmall>
            ({count})
          </AccentText>
        </div>
      </Button>
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
