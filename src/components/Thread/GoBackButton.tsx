import { GradientText, LinkText } from 'components/ui/Text'
import Arrow from 'icons/Arrow'
import classnames, {
  alignItems,
  display,
  gap,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  gap('gap-x-2'),
  alignItems('items-center')
)

export default function () {
  return (
    <LinkText url="/">
      <div className={wrapper} href="/">
        <div className={width('w-2')}>
          <Arrow horizontal reversed pulseDisabled />
        </div>
        <GradientText>Back</GradientText>
      </div>
    </LinkText>
  )
}
