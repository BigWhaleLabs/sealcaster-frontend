import { AccentText, ErrorText, SubHeaderText } from 'components/ui/Text'
import { Link, useLocation } from 'wouter'
import { Suspense } from 'preact/compat'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BurnerStatus from 'components/Landing/BurnerStatus'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import Dots from 'icons/Dots'
import GradientBorder from 'components/ui/GradientBorder'
import Loading from 'icons/Loading'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  space,
  textAlign,
  width,
} from 'classnames/tailwind'
import getErrorMessage from 'helpers/getErrorMessage'
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

const buttonWithStatus = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-center'),
  textAlign('text-center', 'sm:text-left'),
  gap('gap-y-4', 'sm:gap-x-4')
)

const buttonClass = classnames(display('block'), width('w-full', 'sm:w-64'))
const defaultMessage =
  'We could not match the username with the wallet you have connected. Please review them and try again.'

function BurnBlockSuspended() {
  const { account, isBurned, hasPrivate } = useAccount()
  const [location, setLocation] = useLocation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | undefined>()

  const generate = async () => {
    setError('')
    setLoading(true)

    try {
      if (!walletStore.account) await walletStore.connect(true)
      if (!walletStore.account) return setError('Please connect the wallet')
      await BurnerWalletStore.generateBurnerWallet(
        walletStore.account,
        setStatus
      )
      walletStore.exit()
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      setError(typeof errorMessage === 'string' ? errorMessage : defaultMessage)
      handleError(error)
    } finally {
      setStatus(undefined)
      setLoading(false)
      setLocation('/create')
    }
  }

  return (
    <>
      <BurnerStatus account={account} isBurned={isBurned} />
      {!hasPrivate && (
        <div className={buttonWithStatus}>
          <div className={buttonClass}>
            <Button
              type="primary"
              center
              fullWidth
              loadingOverflow
              loading={loading}
              onClick={generate}
            >
              Create Burner Wallet
            </Button>
            {error && (
              <ErrorText visible={!!error} withExclamation>
                {error}
              </ErrorText>
            )}
            {status && (
              <AccentText small color="text-tertiary">
                {status}
              </AccentText>
            )}
          </div>
        </div>
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
          <SubHeaderText small>Already have a burner?</SubHeaderText>
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
