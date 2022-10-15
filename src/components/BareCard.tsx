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
  smallPaddings,
  centered,
  gapY,
  bigPaddings,
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
      'py-2': smallPaddings,
      'px-4': smallPaddings,
      'p-6': bigPaddings,
      'p-4': !smallPaddings && !bigPaddings,
    })
  )

export default function ({
  children,
  smallPaddings,
  bigPaddings,
  centered,
  gapY,
  ...rest
}: HTMLAttributes<HTMLDivElement> & BareCardProps & ChildrenProp) {
  return (
    <div
      className={bareCard({ smallPaddings, centered, gapY, bigPaddings })}
      {...rest}
    >
      {children}
    </div>
  )
}
