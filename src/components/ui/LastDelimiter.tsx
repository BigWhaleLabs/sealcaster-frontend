import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, {
  backgroundColor,
  borderWidth,
  height,
  width,
} from 'classnames/tailwind'

const delimiterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)
const lastDelimiterContainer = classnames(delimiterContainer, displayFrom('xs'))

export default function () {
  return <hr className={lastDelimiterContainer} />
}
