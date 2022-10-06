import classnames, { backgroundColor, height, width } from 'classnames/tailwind'

const vertialDelimiter = classnames(
  height('h-px'),
  width('w-full'),
  backgroundColor('bg-divider')
)

export default function () {
  return <div className={vertialDelimiter}></div>
}
