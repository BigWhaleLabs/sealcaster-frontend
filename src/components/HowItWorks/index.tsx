import { useSnapshot } from 'valtio'
import Body from 'components/HowItWorks/Body'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Card from 'components/ui/Card'
import SealEye from 'icons/SealEye'
import Title from 'components/HowItWorks/Title'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  width,
} from 'classnames/tailwind'

const cardContainer = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-center', 'xs:items-start'),
  gap('gap-y-4', 'xs:gap-x-4')
)
const cardTextBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

export default function () {
  const { privateKey } = useSnapshot(BurnerWalletStore)
  const hasBurnerWallet = !!privateKey

  return (
    <Card>
      <div className={cardContainer}>
        <div className={width('w-14')}>
          <SealEye upsideDown={hasBurnerWallet} />
        </div>

        <div className={cardTextBox}>
          <Title hasBurnerWallet={hasBurnerWallet} />
          <Body hasWallet={hasBurnerWallet} />
        </div>
      </div>
    </Card>
  )
}
