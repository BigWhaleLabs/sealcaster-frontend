import { handleError } from '@big-whale-labs/frontend-utils'
import BurnerInteractionStore from 'stores/BurnerInteractionStore'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import getErrorMessage from 'helpers/getErrorMessage'
import walletStore from 'stores/WalletStore'

export default function ({
  loading,
  onError,
  onLoading,
  onCreateBurner,
}: {
  loading: boolean
  onError: (error: string) => void
  onLoading: (loading: boolean) => void
  onCreateBurner: () => void
}) {
  const buttonTitle = 'Connect wallet to verify'

  const createBurnerWallet = async () => {
    onError('')
    onLoading(true)

    try {
      if (!walletStore.account) await walletStore.connect(true)
      if (!walletStore.account) return onError('Please connect the wallet')
      await BurnerWalletStore.generateBurnerWallet(walletStore.account)
      walletStore.exit()
      BurnerInteractionStore.interactionClosed = false
      onCreateBurner()
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
  )
}
