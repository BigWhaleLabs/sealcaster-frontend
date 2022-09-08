import { StatusText } from 'components/Text'
import classnames, {
  TArg,
  alignItems,
  display,
  justifyContent,
  width,
} from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  display('hidden', 'xs:flex'),
  alignItems('items-center'),
  justifyContent('justify-center')
)

export default function ({
  primary,
  className,
}: {
  primary?: boolean
  className?: TArg
}) {
  return (
    <div className={classnames(bottomSeparator, className)}>
      <StatusText color={primary ? 'primary' : 'default'}>|</StatusText>
    </div>
  )
}
