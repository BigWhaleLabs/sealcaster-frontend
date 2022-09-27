import { AccentText, CardParagraph } from 'components/ui/Text'
import ChildrenProp from 'models/ChildrenProp'
import classnames, {
  display,
  flex,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const recordContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  flex('flex-1'),
  gap('gap-x-4')
)

export default function ({
  index,
  children,
}: { index: number } & ChildrenProp) {
  return (
    <p className={recordContainer}>
      <AccentText bold color="text-accent">
        <CardParagraph>{index}—</CardParagraph>
      </AccentText>
      <span className={flex('flex-1')}>{children}</span>
    </p>
  )
}
