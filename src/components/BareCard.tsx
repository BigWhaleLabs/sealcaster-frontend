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
  bigPaddings?: boolean
  centered?: boolean
  gapY?: boolean
}

const bareCard = ({
  bigPaddings,
  centered,
  gapY,
  smallPaddings,
}: BareCardProps) =>
  classnames(
    display('flex'),
    flexDirection('flex-col'),
    gap({ 'gap-y-4': gapY }),
    alignItems({ 'items-center': centered }),
    textAlign({ 'text-center': centered }),
    backgroundColor('bg-primary-background'),
    borderRadius('rounded-lg'),

    padding({
      'p-4': !smallPaddings && !bigPaddings,
      'p-6': bigPaddings,
      'px-4': smallPaddings,
      'py-2': smallPaddings,
    })
  )

export default function ({
  bigPaddings,
  centered,
  children,
  gapY,
  smallPaddings,
  ...rest
}: HTMLAttributes<HTMLDivElement> & BareCardProps & ChildrenProp) {
  return (
    <div
      className={bareCard({ bigPaddings, centered, gapY, smallPaddings })}
      {...rest}
    >
      {children}
    </div>
  )
}
