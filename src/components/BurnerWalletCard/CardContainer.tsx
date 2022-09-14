import {
  alignItems,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  flexDirection,
  gap,
  padding,
  position,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'
import classNamesToString from 'helpers/classNamesToString'

const cardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  alignItems('items-center'),
  position('relative'),
  borderWidth('border'),
  borderColor('border-transparent'),
  borderRadius('rounded-2xl'),
  padding('py-6', 'px-6', 'xs:py-10'),
  wordBreak('break-words'),
  zIndex('z-20')
)

export default function ({ children }: ChildrenProp) {
  return (
    <div className={classNamesToString('double-gradient-shadow')}>
      {children}
    </div>
  )
}
