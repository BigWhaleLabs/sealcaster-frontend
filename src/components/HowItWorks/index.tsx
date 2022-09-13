import Body from 'components/HowItWorks/Body'
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
  // This state is used to show the second card "How does this work?" after generating burner wallet
  const hasWallet = true
  return (
    <Card>
      <div className={cardContainer}>
        <div className={width('w-14')}>
          <SealEye reversed={hasWallet} />
        </div>

        <div className={cardTextBox}>
          <Title hasWallet={hasWallet} />
          <Body hasWallet={hasWallet} />
        </div>
      </div>
    </Card>
  )
}
