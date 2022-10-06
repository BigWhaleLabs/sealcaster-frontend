import classnames, {
  TBackgroundColor,
  backgroundColor,
  borderWidth,
  height,
  width,
} from 'classnames/tailwind'

const delimiterContainer = (
  color: TBackgroundColor = 'bg-primary-dimmed',
  horizontal = false
) =>
  classnames(
    borderWidth('border-0'),
    backgroundColor(color),
    width(horizontal ? 'w-full' : 'w-px'),
    height(horizontal ? 'h-px' : 'h-4')
  )

export default function ({
  color,
  horizontal,
}: {
  color?: TBackgroundColor
  horizontal?: boolean
}) {
  return <hr className={delimiterContainer(color, horizontal)} />
}
