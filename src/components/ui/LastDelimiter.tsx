import { displayFrom } from 'helpers/visibilityClassnames'
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

export function Delimiter({
  color,
  horizontal = true,
}: {
  color?: TBackgroundColor
  horizontal?: boolean
}) {
  return <hr className={delimiterContainer(color, horizontal)} />
}

export default function ({ color }: { color?: TBackgroundColor }) {
  return (
    <div className={displayFrom('xs')}>
      <hr className={delimiterContainer(color)} />
    </div>
  )
}
