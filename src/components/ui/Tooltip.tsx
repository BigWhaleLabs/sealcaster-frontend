import { Tooltip } from '@material-tailwind/react/components/Tooltip'
import { highlightedText } from 'components/ui/Text'
import { placement } from '@material-tailwind/react/types/components/popover'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  backgroundColor,
  borderRadius,
  padding,
  width,
  zIndex,
} from 'classnames/tailwind'
import useOffsetOrientation from 'hooks/useOffsetOrientation'

const tooltipClasses = classnames(
  backgroundColor('bg-formal-accent'),
  padding('py-2', 'px-5'),
  zIndex('z-50'),
  borderRadius('rounded-lg'),
  highlightedText(false),
  width('w-3/4', 'md:w-seal-grid')
)

export default function ({
  children,
  disabled,
  position,
  text,
}: ChildrenProp & {
  text: string
  position: placement
  arrow?: boolean
  fitContainer?: boolean
  disabled?: boolean
}) {
  if (disabled) return <>{children}</>
  const { offset } = useOffsetOrientation()

  return (
    <Tooltip
      children={children}
      className={tooltipClasses}
      content={text}
      offset={offset}
      placement={position}
    />
  )
}
