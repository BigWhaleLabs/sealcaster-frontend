import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useLocation } from 'wouter'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import getErrorMessage from 'helpers/getErrorMessage'
import walletStore from 'stores/WalletStore'

const defaultMessage =
  'We could not match the username with the wallet you have connected. Please review them and try again.'

export default function ({
  account,
  loading,
  burnerLoading,
  onError,
  onLoading,
}: {
  account?: string
  loading: boolean
  burnerLoading: boolean
  onError: (error: string) => void
  onLoading: (loading: boolean) => void
}) {
  const [, setLocation] = useLocation()
  const buttonTitle = account
    ? 'Create burner wallet'
    : 'Connect & create burner wallet'

  const createBurnerWallet = async () => {
    onError('')
    onLoading(true)
    const { account: userAccount } = walletStore

    try {
      if (!userAccount) await walletStore.connect(true)
      if (!userAccount) return onError('Please connect the wallet')

      await BurnerWalletStore.generateBurnerWallet(userAccount)
      walletStore.exit()
      setLocation('/wallet')
    } catch (error) {
      const errorMessage = getErrorMessage(error)
      onError(typeof errorMessage === 'string' ? errorMessage : defaultMessage)
      handleError(error)
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
          loading={loading || burnerLoading}
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
          loading={loading || burnerLoading}
          onClick={createBurnerWallet}
        >
          {buttonTitle}
        </Button>
      </div>
    </>
  )
}
