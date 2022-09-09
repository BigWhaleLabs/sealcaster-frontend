import { Size, displayFrom } from 'helpers/visibilityClassnames'
import { StatusText } from 'components/Text'
import classnames, {
  TArg,
  alignItems,
  justifyContent,
  width,
} from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  alignItems('items-center'),
  justifyContent('justify-center')
)

export default function ({
  color = 'default',
  className,
  showFrom = 'xs',
}: {
  color?: 'accent' | 'primary' | 'error' | 'dimmed' | 'default'
  className?: TArg
  showFrom?: Size
}) {
  return (
    <div
      className={classnames(bottomSeparator, className, displayFrom(showFrom))}
    >
      <StatusText color={color}>|</StatusText>
    </div>
  )
}
