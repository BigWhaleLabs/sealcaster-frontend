import { HeaderText, SubHeaderText } from 'components/ui/Text'
import SealGrid from 'icons/SealGrid'
import SealSad from 'icons/SealSad'
import classnames, {
  display,
  justifyContent,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'

const sealGridWrapper = classnames(
  display('flex'),
  justifyContent('justify-center'),
  width('w-60', 'sm:w-72', 'md:w-seal-grid')
)
const headerTextWrapper = classnames(
  space('space-y-2'),
  textAlign('text-center')
)

export default function ({
  account,
  isBurned,
}: {
  account?: string
  isBurned?: boolean
}) {
  const incorrect = account && !isBurned

  const headerText = incorrect
    ? 'It looks like you connected a wallet without the correct ZK badge'
    : 'Cast anonymously on Farcaster'
  const subHeaderText = incorrect
    ? 'Create a burner wallet with a Farcaster ZK badge to continue, or reconnect with the correct burner wallet'
    : 'Protect your identity by creating a burner wallet'
  const statusIcon = incorrect ? <SealSad /> : <SealGrid />

  return (
    <>
      <div className={sealGridWrapper}>{statusIcon}</div>
      <div className={headerTextWrapper}>
        <HeaderText center extraLeading size="large">
          {headerText}
        </HeaderText>
        <SubHeaderText small primary>
          {subHeaderText}
        </SubHeaderText>
      </div>
    </>
  )
}
