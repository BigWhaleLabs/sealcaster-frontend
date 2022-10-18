import { BodyText, ErrorText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import ConnectAndCreateButton from 'components/Landing/ConnectAndCreateButton'
import LoadingBlock from 'components/ui/LoadingBlock'
import SealSad from 'icons/SealSad'

export default function ({
  onCreateBurner,
  text,
  status,
}: {
  status: string
  onCreateBurner: () => void
  text: string
}) {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { privateKey } = useSnapshot(BurnerWalletStore)

  setError('error')

  return (
    <LoadingBlock
      loadingText={status || 'Preparing cast'}
      errorBlock={
        error && (
          <>
            <SealSad
              triangleColor="stroke-error"
              sealColor="stroke-accent"
              noMobile
            />
            <ErrorText centered>
              Verification failed. Please double check that the wallet you’re
              connecting is the same as the one you have connected to Farcaster.
            </ErrorText>
          </>
        )
      }
      subtitle={
        <>
          <BodyText center>{text}</BodyText>
          {!loading && !privateKey && (
            <div>
              <ConnectAndCreateButton
                onCreateBurner={onCreateBurner}
                loading={loading}
                onError={setError}
                onLoading={setLoading}
              />
            </div>
          )}
        </>
      }
    />
  )
}
