import { borderRadius, classnames, padding, width } from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'

const wrapperStyles = classnames(
  width('w-full'),
  padding('p-px'),
  borderRadius('rounded-2xl')
)

export default function ({ children }: ChildrenProp) {
  return (
    <div
      className={classNamesToString(wrapperStyles, 'double-gradient-shadow')}
    >
      {children}
    </div>
  )
}
