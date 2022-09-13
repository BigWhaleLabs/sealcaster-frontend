import {
  alignItems,
  alignSelf,
  classnames,
  display,
  flexDirection,
  justifyContent,
  margin,
  space,
} from 'classnames/tailwind'
import Counter from 'components/ui/Counter'

const footerBox = classnames(
  display('flex'),
  flexDirection('flex-row'),
  space('space-x-2'),
  margin('mt-4'),
  alignItems('items-end'),
  justifyContent('justify-between'),
  alignSelf('self-end')
)

interface SuffixProps {
  maxCount: number
  text: string
}

export default function ({ maxCount, text }: SuffixProps) {
  return (
    <div className={footerBox}>
      <Counter max={maxCount} value={text.length} />
    </div>
  )
}
