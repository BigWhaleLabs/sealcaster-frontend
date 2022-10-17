import { AccentText, BodyText } from 'components/ui/Text'
import { parseErrorText } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import ConnectAndCreateButton from 'components/Landing/ConnectAndCreateButton'
import ErrorMessage from 'components/ui/ErrorMessage'
import LoadingBlock from 'components/ui/LoadingBlock'

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

  return (
    <LoadingBlock
      loadingText={status || 'Preparing cast'}
      subtitle={
        <>
          {error && (
            <ErrorMessage withExclamation text={parseErrorText(error)} />
          )}
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
