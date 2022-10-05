import { AccentText, BodyText } from 'components/ui/Text'
import Reply from 'icons/Reply'
import classnames, { alignItems, display, gap } from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-1')
)

export default function ({ count }: { count: number }) {
  return (
    <div className={wrapper}>
      <Reply />
      <BodyText primary>Reply</BodyText>
      <AccentText primary color="text-primary-semi-dimmed" extraSmall>
        ({count})
      </AccentText>
    </div>
  )
}
