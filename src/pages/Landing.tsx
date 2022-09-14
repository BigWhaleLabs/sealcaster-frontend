import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import BlockchainList from 'components/BlockchainList'
import BurnerBlock from 'components/Landing/BurnerBlock'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import HowItWorks from 'components/HowItWorks'
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
  const [_, setLocation] = useLocation()
  const { hasBurnedWallet } = useSnapshot(BurnerWalletStore)

  if (hasBurnedWallet) setLocation('/cast')

  return (
    <div className={blocksWrapper}>
      <BurnerBlock />
      <HowItWorks />
      <BlockchainList />
    </div>
  )
}
