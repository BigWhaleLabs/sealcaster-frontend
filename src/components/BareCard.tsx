import { HTMLAttributes } from 'preact/compat'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  padding,
  textAlign,
} from 'classnames/tailwind'

interface BareCardProps {
  smallPaddings?: boolean
  centered?: boolean
  gapY?: boolean
}

const bareCard = ({ smallPaddings, centered, gapY }: BareCardProps) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    gap({ 'gap-y-4': gapY }),
    alignItems({ 'items-center': centered }),
    textAlign({ 'text-center': centered }),
    backgroundColor('bg-primary-background'),
    borderRadius('rounded-lg'),

    padding(smallPaddings ? { 'py-2': true, 'px-4': true } : 'p-4')
  )

export default function ({
  children,
  smallPaddings,
  centered,
  gapY,
  ...rest
}: HTMLAttributes<HTMLDivElement> & BareCardProps & ChildrenProp) {
  return (
    <div className={bareCard({ smallPaddings, centered, gapY })} {...rest}>
      {children}
    </div>
  )
}
