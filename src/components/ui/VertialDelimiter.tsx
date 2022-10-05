import { Size, displayFrom } from 'helpers/visibilityClassnames'
import { StatusText } from 'components/ui/Text'
import classnames, {
  TArg,
  alignItems,
  backgroundColor,
  height,
  justifyContent,
  width,
} from 'classnames/tailwind'

const bottomSeparator = classnames(
  width('w-fit'),
  alignItems('items-center'),
  justifyContent('justify-center')
)

// TODO: make bg black
const vertialDelimiter = classnames(
  height('h-px'),
  width('w-full'),
  backgroundColor('bg-divider')
)

export default function () {
  return <div className={vertialDelimiter}></div>
}
