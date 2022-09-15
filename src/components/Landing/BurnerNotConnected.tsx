import { HeaderText, SubHeaderText } from 'components/ui/Text'
import SealGrid from 'icons/SealGrid'
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
        <SealGrid />
      </div>
      <div className={headerTextWrapper}>
        <HeaderText center extraLeading size="large">
          Cast anonymously on Farcaster
        </HeaderText>
        <SubHeaderText>
          Protect your identity by creating a burner wallet.
        </SubHeaderText>
      </div>
    </>
  )
}
