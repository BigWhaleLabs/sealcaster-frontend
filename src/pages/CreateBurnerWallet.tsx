import { AccentText, HeaderText, PostText } from 'components/ui/Text'
import { Sizes } from 'models/CharInCircle'
import { useEffect, useState } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import BurnerWalletCard from 'components/BurnerWalletCard'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import HowItWorks from 'components/HowItWorks'
import TextInput from 'components/ui/TextInput'
import Tooltip from 'components/ui/Tooltip'
import axios, { AxiosError } from 'axios'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  textAlign,
  width,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
)
const topPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const bottomPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-start'),
  gap('gap-y-6')
)

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1.5')
)
const buttonWithStatus = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-center'),
  textAlign('text-center', 'sm:text-left'),
  gap('gap-y-4', 'sm:gap-x-4')
)
const buttonClass = classnames(display('block'), width('w-full', 'sm:w-64'))

export default function () {
  const { account } = useSnapshot(walletStore)
  const { privateKey } = useSnapshot(BurnerWalletStore)
  const [username, setUsername] = useState('')
  const [hasError, setHasError] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<string | undefined>()

  const generate = async () => {
    setHasError('')
    if (!username.length) return setHasError('Username cannot be empty')
    setLoading(true)

    try {
      await walletStore.connect(true)
      if (!walletStore.account) return setHasError('Connect account!')

      await BurnerWalletStore.generateBurnerWallet(
        username,
        walletStore.account,
        setStatus
      )
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          (error as AxiosError<{ message: string }>).response?.data.message ||
          'Verification failed'
        setHasError(message)
      }

      console.log('error', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setStatus('')
    setHasError('')
  }, [account])

  const hintText =
    'You can see what eth address you have connected to Farcaster in profile settings.'

  return (
    <div className={wrapper}>
      <div className={topPart}>
        {privateKey ? (
          <>
            <HeaderText>Voilà—your burner wallet</HeaderText>
            <PostText>
              This wallet verifies that you are a user of Farcaster, but won’t
              reveal who you are. Connect with this wallet in the future to
              create anonymous casts.
            </PostText>
            <BurnerWalletCard privateKey={privateKey} />
          </>
        ) : (
          <>
            <HeaderText>
              Now let’s verify that you have a Farcaster profile
            </HeaderText>
            <PostText>
              We’ll need to match your Farcaster username with the wallet you
              connected to your Farcaster profile.{' '}
              <AccentText color="text-accent">
                <Tooltip position="bottom" text={hintText}>
                  <span className={hintWrapper}>
                    <CharInCircle size={Sizes.Small} char="?" />
                  </span>
                </Tooltip>
              </AccentText>
            </PostText>
          </>
        )}
      </div>
      {privateKey ? (
        <HowItWorks />
      ) : (
        <div className={bottomPart}>
          <TextInput
            withAtSign
            value={username}
            errorMessage={hasError}
            disabled={loading}
            onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
            onKeyDown={(event) => event.code === 'Enter' && generate()}
          />
          <PostText>
            You’ll verify your username and profile by connecting the same
            wallet you connected to Farcaster.
          </PostText>
          <div className={buttonWithStatus}>
            <div className={buttonClass}>
              <Button
                center
                fullWidth
                loadingOverflow
                type="primary"
                loading={loading}
                disabled={!username.length}
                onClick={generate}
              >
                Connect & verify
              </Button>
            </div>
            {status && (
              <AccentText small color="text-tertiary">
                {status}
              </AccentText>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
