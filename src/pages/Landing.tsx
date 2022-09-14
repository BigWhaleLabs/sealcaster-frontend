import { useLocation } from 'wouter'
import BlockchainList from 'components/BlockchainList'
import BurnerBlock from 'components/Landing/BurnerBlock'
import HowItWorks from 'components/HowItWorks'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'
import useAccount from 'hooks/useAccount'

const blocksWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-12')
)

export default function () {
  const [_, setLocation] = useLocation()
  const { account, isBurned } = useAccount()

  if (account) setLocation(isBurned ? '/cast' : '/create')

  return (
    <div className={blocksWrapper}>
      <BurnerBlock />
      <HowItWorks />
      <BlockchainList />
    </div>
  )
}
