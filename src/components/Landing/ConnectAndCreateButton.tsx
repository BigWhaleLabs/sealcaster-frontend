import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { handleError } from '@big-whale-labs/frontend-utils'
import { requestFarcasterAttestation } from 'helpers/attestor'
import { useLocation } from 'wouter'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import getErrorMessage from 'helpers/getErrorMessage'
import walletStore from 'stores/WalletStore'

export default function ({
  account,
  loading,
  onError,
  onLoading,
}: {
  account?: string
  loading: boolean
  onError: (error: string) => void
  onLoading: (loading: boolean) => void
}) {
  const [, setLocation] = useLocation()
  const buttonTitle = account
    ? 'Create burner wallet'
    : 'Connect & create burner wallet'

  const checkBadgeAndSignature = async (address: string) => {
    BurnerWalletStore.burnerLoading = true
    try {
      BurnerWalletStore.status = 'Checking Farcaster account...'
      await requestFarcasterAttestation(address)
      return true
    } catch (error) {
      return false
    } finally {
      BurnerWalletStore.burnerLoading = false
      BurnerWalletStore.status = ''
    }
  }

  const createBurnerWallet = async () => {
    onError('')
    onLoading(true)

    try {
      if (!walletStore.account) await walletStore.connect(true)
      if (!walletStore.account) return onError('Please connect the wallet')
      const hasFarcaster = await checkBadgeAndSignature(walletStore.account)
      if (!hasFarcaster) {
        if (await walletStore.hasFarcasterBadge) {
          setLocation('/cast')
          return
        }
      }
      await BurnerWalletStore.generateBurnerWallet(walletStore.account)
      walletStore.exit()
      setLocation('/wallet')
    } catch (error) {
      let errorMessage = getErrorMessage(error)
      if (
        typeof errorMessage === 'string' &&
        errorMessage.includes('user rejected signing')
      ) {
        errorMessage = 'Please sign the transaction to create a burner wallet'
      }
      onError(
        typeof errorMessage === 'string'
          ? errorMessage
          : 'We could not match the username with the wallet you have connected. Please review them and try again.'
      )
      handleError(
        typeof errorMessage === 'string'
          ? new Error(errorMessage)
          : errorMessage
      )
    } finally {
      onLoading(false)
    }
  }

  return (
    <>
      <div className={displayTo('md')}>
        <Button
          small
          center
          fullWidth
          loadingOverflow
          type="primary"
          loading={loading}
          onClick={createBurnerWallet}
        >
          {buttonTitle}
        </Button>
      </div>
      <div className={displayFrom('md')}>
        <Button
          center
          fullWidth
          loadingOverflow
          type="primary"
          loading={loading}
          onClick={createBurnerWallet}
        >
          {buttonTitle}
        </Button>
      </div>
    </>
  )
}
