import { HeaderText, SubHeaderText } from 'components/ui/Text'
import { Link, useLocation } from 'wouter'
import Button from 'components/ui/Button'
import Dots from 'icons/Dots'
import GradientBorder from 'components/ui/GradientBorder'
import SealGrid from 'icons/SealGrid'
import SealSad from 'icons/SealSad'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'
import useAccount from 'hooks/useAccount'
import walletStore from 'stores/WalletStore'

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

const headerTextWrapper = classnames(
  space('space-y-2'),
  textAlign('text-center')
)

export default function () {
  const { account, isBurned } = useAccount()
  const [location, setLocation] = useLocation()

  return (
    <div className={wrapper}>
      {account && !isBurned ? (
        <>
          <div className={sealGridWrapper}>
            <SealSad />
          </div>
          <div className={headerTextWrapper}>
            <HeaderText center extraLeading size="large">
              It looks like you connected a wallet without the correct zk badge
            </HeaderText>
            <SubHeaderText>
              Create a burner wallet with the Farcaster zk badge to continue, or
              reconnect with the correct burner wallet.
            </SubHeaderText>
          </div>
        </>
      ) : (
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
      )}
      <Link href="/create">
        <Button type="primary">Create Burner Wallet</Button>
      </Link>
      {account ? (
        isBurned ? (
          <>
            <Dots />
            <Link href="/cast">
              <div className={buttonWrapper}>
                <GradientBorder>
                  <Button gradientFont type="secondary" small>
                    Create cast
                  </Button>
                </GradientBorder>
              </div>
            </Link>
          </>
        ) : null
      ) : (
        <>
          <Dots />
          <div className={space('space-y-4')}>
            <SubHeaderText>Already have a burner?</SubHeaderText>
            <div
              className={buttonWrapper}
              onClick={async () => {
                await walletStore.connect(true)
                if ((await walletStore.isBurnedWallet) && location !== '/cast')
                  setLocation('/cast')
              }}
            >
              <GradientBorder>
                <Button gradientFont type="secondary" small>
                  Connect Burner
                </Button>
              </GradientBorder>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
