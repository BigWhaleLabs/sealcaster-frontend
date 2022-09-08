import BlockchainList from 'components/BlockchainList'
import BurnerBlock from 'components/Landing/BurnerBlock'
import HowItWorks from 'components/HowItWorks'
import classnames, {
  alignItems,
  display,
  flexDirection,
  space,
  textAlign,
} from 'classnames/tailwind'

const blocksWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  space('space-y-12'),
  textAlign('text-center')
)

export default function () {
  return (
    <div className={blocksWrapper}>
      <BurnerBlock />
      <HowItWorks />
      <BlockchainList />
    </div>
  )
}
