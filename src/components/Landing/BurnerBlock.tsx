import { AccentText, ErrorText, SubHeaderText } from 'components/ui/Text'
import { Link, useLocation } from 'wouter'
import { Suspense } from 'preact/compat'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
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
import useBadgeAccount from 'hooks/useBadgeAccount'
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
  flexDirection('flex-col'),
  alignItems('items-center'),
  textAlign('text-center'),
  gap('gap-y-4')
)

const buttonClass = classnames(display('block'), width('w-full', 'sm:w-80'))
const defaultMessage =
  'We could not match the username with the wallet you have connected. Please review them and try again.'

function BurnerBlockSuspended() {
  const { account, isBurner, hasFarcasterBadge } = useBadgeAccount()
  const [location, setLocation] = useLocation()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { burnerLoading, status } = useSnapshot(BurnerWalletStore)

  return (
    <>
      <BurnerStatus loading={loading || burnerLoading} />
      {(!account || !hasFarcasterBadge || loading) && (
        <div className={buttonWithStatus}>
          <div className={buttonClass}>
            <Button
              type="primary"
              center
              fullWidth
              loadingOverflow
              loading={loading || burnerLoading}
              onClick={async () => {
                setError('')
                setLoading(true)

                try {
                  if (!walletStore.account) await walletStore.connect(true)
                  if (!walletStore.account)
                    return setError('Please connect the wallet')
                  BurnerWalletStore.status = 'Connecting wallet...'
                  await BurnerWalletStore.generateBurnerWallet(
                    walletStore.account
                  )
                  walletStore.exit()
                  setLocation('/wallet')
                } catch (error) {
                  BurnerWalletStore.status = ''
                  const errorMessage = getErrorMessage(error)
                  setError(
                    typeof errorMessage === 'string'
                      ? errorMessage
                      : defaultMessage
                  )
                  handleError(error)
                } finally {
                  setLoading(false)
                }
              }}
            >
              {account
                ? 'Create burner wallet'
                : 'Connect & create burner wallet'}
            </Button>
          </div>
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
      )}
      {!loading && (
        <>
          {(!account || isBurner) && <Dots />}
          {account ? (
            isBurner && (
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
                        (await walletStore.hasFarcasterBadge) &&
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
      )}
    </>
  )
}

export default function () {
  return (
    <div className={wrapper}>
      <Suspense fallback={<Loading />}>
        <BurnerBlockSuspended />
      </Suspense>
    </div>
  )
}
