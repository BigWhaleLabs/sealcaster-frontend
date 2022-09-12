import {
  alignItems,
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  flexDirection,
  gap,
  gradientColorStops,
  maxWidth,
  padding,
  position,
  width,
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
const parentWrapper = classnames(
  maxWidth('max-w-full'),
  width('w-auto'),
  borderRadius('rounded-2xl'),
  backgroundImage('bg-gradient-to-br'),
  padding('p-px'),
  gradientColorStops('from-secondary', 'to-accent')
)
const innerWrapper = classnames(
  width('w-full'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-primary-background')
)

export default function ({ children }: ChildrenProp & { small?: boolean }) {
  return (
    <div
      className={classNamesToString(parentWrapper, 'double-gradient-shadow')}
    >
      <div className={innerWrapper}>
        <div className={cardContainer}>{children}</div>
      </div>
    </div>
  )
}
