import { AccentText, CardParagraph, LinkText } from 'components/Text'
import Card from 'components/Card'
import SealEye from 'icons/SealEye'
import StepList from 'components/HowItWorks/StepList'
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
  gap('gap-y-4', 'xs:gap-x-4', 'xs:gap-y-0')
)
const cardTextBox = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

export default function () {
  return (
    <Card>
      <div className={cardContainer}>
        <div className={width('w-14')}>
          <SealEye />
        </div>

        <div className={cardTextBox}>
          <Title />
          <StepList />
          <CardParagraph>
            <AccentText color="text-accent">Bonus: </AccentText>
            Add more zk badges to your burnerwallet with{' '}
            <LinkText url="https://sealcred.xyz">SealCred</LinkText>.
          </CardParagraph>
        </div>
      </div>
    </Card>
  )
}
