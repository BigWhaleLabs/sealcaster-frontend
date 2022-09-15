import { HeaderText, SubHeaderText } from 'components/ui/Text'
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

export default function () {
  return (
    <>
      <div className={sealGridWrapper}>
        <SealSad />
      </div>
      <div className={headerTextWrapper}>
        <HeaderText center extraLeading size="large">
          It looks like you connected a wallet without the correct zk badge
        </HeaderText>
        <SubHeaderText defaultFont>
          Create a burner wallet with the Farcaster zk badge to continue, or
          reconnect with the correct burner wallet.
        </SubHeaderText>
      </div>
    </>
  )
}
