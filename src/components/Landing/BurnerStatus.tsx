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
import useBadgeAccount from 'hooks/useBadgeAccount'

const sealGridWrapper = classnames(
  display('flex'),
  justifyContent('justify-center'),
  width('w-60', 'sm:w-72', 'md:w-seal-grid')
)
const headerTextWrapper = classnames(
  space('space-y-2'),
  textAlign('text-center')
)
export default function ({ loading }: { loading: boolean }) {
  const { account, hasFarcasterBadge } = useBadgeAccount()
  console.log('loading inside BurnerStatus', loading)
  const accountWithoutBadgeConnected = account && !hasFarcasterBadge && !loading
  return (
    <>
      <div className={sealGridWrapper}>
        {accountWithoutBadgeConnected ? <SealSad /> : <SealGrid />}
      </div>
      <div className={headerTextWrapper}>
        <HeaderText center extraLeading size="large">
          {accountWithoutBadgeConnected
            ? 'It looks like you connected a wallet without a correct ZK badge'
            : 'Cast anonymously on Farcaster'}
        </HeaderText>
        <SubHeaderText small primary>
          {accountWithoutBadgeConnected
            ? 'Create a burner wallet with a Farcaster ZK badge to continue, or reconnect with a correct burner wallet'
            : `Protect your identity and cast anonymously with a burner wallet.${
                account
                  ? ''
                  : ' Start by connecting the same wallet you connected to Farcaster.'
              }`}
        </SubHeaderText>
      </div>
    </>
  )
}
