import { AccentText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import ReplyIcon from 'icons/ReplyIcon'
import ReplyInput from 'components/BlockchainList/ReplyInput'
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
  replyingTo,
}: {
  count: number
  replyingTo: string
}) {
  const [inputOpen, setInputOpen] = useState(false)

  return (
    <>
      <Button type="tertiary" onClick={() => setInputOpen(!inputOpen)}>
        <div className={replyButtonWrapper}>
          <ReplyIcon />
          <AccentText small color="text-formal-accent">
            <span className={textColor({ 'text-accent': inputOpen })}>
              Reply
            </span>
          </AccentText>
          <AccentText primary color="text-primary-semi-dimmed" extraSmall>
            ({count})
          </AccentText>
        </div>
      </Button>
      <ReplyInput replyingTo={replyingTo} inputOpen={inputOpen} />
    </>
  )
}
