import BlockchainList from 'components/BlockchainList'
import BurnerBlock from 'components/Landing/BurnerBlock'
import HowItWorks from 'components/HowItWorks'
import ScrollToTop from 'components/ui/ScrollToTop'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'

const blocksWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-12')
)

export default function () {
  return (
    <div className={blocksWrapper}>
      <BurnerBlock />
      <HowItWorks />
      <BlockchainList />
      <ScrollToTop />
    </div>
  )
}
