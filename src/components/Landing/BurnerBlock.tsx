import { HeaderText, SubHeaderText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import Dots from 'icons/Dots'
import GradientBorder from 'components/ui/GradientBorder'
import SealGrid from 'icons/SealGrid'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  space,
  textAlign,
  textColor,
  width,
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

const sealGridWrapper = classnames(
  display('flex'),
  justifyContent('justify-center'),
  width('w-60', 'sm:w-72', 'md:w-seal-grid')
)

export default function () {
  return (
    <div className={wrapper}>
      <div className={sealGridWrapper}>
        <SealGrid />
      </div>
      <div
        className={classnames(
          space('space-y-2'),
          textAlign('text-center', 'sm:text-left')
        )}
      >
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
