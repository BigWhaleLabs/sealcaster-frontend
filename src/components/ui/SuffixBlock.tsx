import { StateUpdater, Suspense } from 'preact/compat'
import { SuffixText } from 'components/ui/Text'
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
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'
// import useContractSymbols from 'hooks/useContractSymbols'
// import useDerivativeAddressesOwned from 'hooks/useDerivativeAddressesOwned'

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

function SuspendedSuffix({ maxCount, text }: SuffixProps) {
  return (
    <div className={footerBox}>
      <Counter max={maxCount} value={text.length} />
    </div>
  )
}

export default function ({ maxCount, text }: SuffixProps) {
  return <SuspendedSuffix maxCount={maxCount} text={text} />
}
