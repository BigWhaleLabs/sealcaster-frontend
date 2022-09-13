import { HeaderText, SubHeaderText } from 'components/ui/Text'
import { Link } from 'wouter'
import Button from 'components/ui/Button'
import Dots from 'icons/Dots'
import GradientBorder from 'components/ui/GradientBorder'
import SealGrid from 'icons/SealGrid'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  space('space-y-6'),
  display('flex'),
  flexDirection('flex-col'),
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
      <Link href="/create">
        <Button type="primary">Create Burner Wallet</Button>
      </Link>
      <Dots />
      <div className={space('space-y-4')}>
        <SubHeaderText>Already have a burner?</SubHeaderText>
        <div className={buttonWrapper}>
          <GradientBorder>
            <Button gradientFont type="secondary" small>
              Connect Burner
            </Button>
          </GradientBorder>
        </div>
      </div>
    </div>
  )
}
