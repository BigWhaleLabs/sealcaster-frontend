import { Button, GradientBorder } from '@big-whale-labs/ui-kit'
import { HeaderText, SubHeaderText } from 'components/Text'
import Dots from 'icons/Dots'
import SealGrid from 'icons/SealGrid'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  space,
  textColor,
} from 'classnames/tailwind'

const wrapper = classnames(
  space('space-y-6'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center')
)

const buttonContentWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-3'),
  textColor('text-inherit'),
  alignItems('items-center')
)

const buttonWrapper = classnames(
  display('flex'),
  justifyContent('justify-center')
)

export default function () {
  return (
    <div className={wrapper}>
      <SealGrid />
      <div className={space('space-y-2')}>
        <HeaderText center big extraLeading>
          Cast anonymously on Farcaster
        </HeaderText>
        <SubHeaderText>
          Protect your identity by creating a burner wallet.
        </SubHeaderText>
      </div>
      <Button type="primary">Create Burner Wallet</Button>
      <Dots />
      <div className={space('space-y-4')}>
        <SubHeaderText>Already have a burner?</SubHeaderText>
        <div className={buttonWrapper}>
          <GradientBorder>
            <Button gradientFont type="secondary" small>
              <div className={buttonContentWrapper}>Connect Burner</div>
            </Button>
          </GradientBorder>
        </div>
      </div>
    </div>
  )
}
