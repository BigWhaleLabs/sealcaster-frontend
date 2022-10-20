import { GradientText } from 'components/ui/Text'
import { Link } from 'wouter'
import Arrow from 'icons/Arrow'
import classnames, {
  alignItems,
  cursor,
  display,
  gap,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  width('w-fit'),
  gap('gap-x-2'),
  alignItems('items-center'),
  cursor('cursor-pointer')
)

export default function () {
  return (
    <Link to={'/'}>
      <div className={wrapper} href="/">
        <div className={width('w-2')}>
          <Arrow horizontal reversed pulseDisabled />
        </div>
        <GradientText>Back</GradientText>
      </div>
    </Link>
  )
}
