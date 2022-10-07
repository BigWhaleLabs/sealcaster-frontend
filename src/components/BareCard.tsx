import { HTMLAttributes } from 'preact/compat'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  padding,
} from 'classnames/tailwind'

interface BareCardProps {
  smallPaddings?: boolean
}

const bareCard = (smallPaddings?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    gap('gap-y-6'),
    backgroundColor('bg-primary-background'),
    borderRadius('rounded-lg'),
    padding(smallPaddings ? { 'py-2': true, 'px-4': true } : 'p-4')
  )

export default function ({
  children,
  smallPaddings,
  ...rest
}: HTMLAttributes<HTMLDivElement> & BareCardProps & ChildrenProp) {
  return (
    <div className={bareCard(smallPaddings)} {...rest}>
      {children}
    </div>
  )
}
