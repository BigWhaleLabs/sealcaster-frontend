import { AccentText, BodyText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Reply from 'icons/Reply'
import ReplyInput from 'components/BlockchainList/ReplyInput'
import classnames, {
  alignItems,
  display,
  gap,
  textColor,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
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
      <button className={wrapper} onClick={() => setInputOpen(!inputOpen)}>
        <Reply />
        <BodyText primary>
          <span className={textColor({ 'text-accent': inputOpen })}>Reply</span>
        </BodyText>
        <AccentText primary color="text-primary-semi-dimmed" extraSmall>
          ({count})
        </AccentText>
      </button>
      <ReplyInput replyingTo={replyingTo} inputOpen={inputOpen} />
    </>
  )
}
