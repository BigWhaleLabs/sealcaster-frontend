import { AccentText } from 'components/Text'
import ChildrenProp from 'models/ChildrenProp'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const recordContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-4')
)

export default function ({
  index,
  children,
}: { index: number } & ChildrenProp) {
  return (
    <p className={recordContainer}>
      <AccentText bold color="text-accent">
        {index}—
      </AccentText>
      <span>{children}</span>
    </p>
  )
}
