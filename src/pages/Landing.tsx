import BlockchainList from 'components/BlockchainList'
import BurnerBlock from 'components/Landing/BurnerBlock'
import HowItWorks from 'components/HowItWorks'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'
import useScrollToTop from 'hooks/useScrollToTop'

const blocksWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-12')
)

export default function () {
  useScrollToTop()

  return (
    <div className={blocksWrapper}>
      <BurnerBlock />
      <HowItWorks />
      <BlockchainList />
    </div>
  )
}
