import { Link, useLocation } from 'wouter'
import { SubHeaderText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import BurnerStatus from 'components/Landing/BurnerStatus'
import Button from 'components/ui/Button'
import Dots from 'icons/Dots'
import GradientBorder from 'components/ui/GradientBorder'
import Loading from 'icons/Loading'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
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

function BurnBlockSuspended() {
  const { account, isBurned, hasPrivate } = useAccount()
  const [location, setLocation] = useLocation()

  return (
    <>
      <BurnerStatus account={account} isBurned={isBurned} />
      {!hasPrivate && (
        <Link href="/create">
          <Button type="primary">Create Burner Wallet</Button>
        </Link>
      )}
      {(!account || isBurned) && <Dots />}
      {account ? (
        isBurned && (
          <Link href="/cast">
            <div className={buttonWrapper}>
              <GradientBorder>
                <Button gradientFont type="secondary" small>
                  Create cast
                </Button>
              </GradientBorder>
            </div>
          </Link>
        )
      ) : (
        <div className={space('space-y-4')}>
          <SubHeaderText textSize="text-sm">
            Already have a burner?
          </SubHeaderText>
          <div className={buttonWrapper}>
            <GradientBorder>
              <Button
                gradientFont
                type="secondary"
                small
                onClick={async () => {
                  await walletStore.connect(true)
                  if (
                    (await walletStore.isBurnedWallet) &&
                    location !== '/cast'
                  )
                    setLocation('/cast')
                }}
              >
                Connect burner
              </Button>
            </GradientBorder>
          </div>
        </div>
      )}
    </>
  )
}

export default function () {
  return (
    <div className={wrapper}>
      <Suspense
        fallback={
          <>
            <BurnerStatus />
            <Loading />
          </>
        }
      >
        <BurnBlockSuspended />
      </Suspense>
    </div>
  )
}
