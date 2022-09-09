import {
  alignItems,
  backgroundColor,
  borderRadius,
  borderWidth,
  classnames,
  display,
  dropShadow,
  flexDirection,
  gap,
  maxWidth,
  padding,
  position,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'
import ChildrenProp from 'models/ChildrenProp'

const cardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  alignItems('items-center'),
  position('relative'),
  borderWidth('border'),
  dropShadow('drop-shadow-accent-secondary-gradient'),
  borderRadius('rounded-2xl'),
  backgroundColor('bg-primary-background'),
  padding('py-10', 'px-6'),
  maxWidth('max-w-full'),
  width('w-auto'),
  wordBreak('break-words'),
  zIndex('z-20')
)

export default function ({ children }: ChildrenProp & { small?: boolean }) {
  return <div className={cardContainer}>{children}</div>
}
