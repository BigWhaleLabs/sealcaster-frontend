import { AccentText, BodyText } from 'components/ui/Text'
import { parseErrorText } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import ConnectAndCreateButton from 'components/Landing/ConnectAndCreateButton'
import ErrorMessage from 'components/ui/ErrorMessage'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  gap,
  padding,
  width,
} from 'classnames/tailwind'

const cardWrapper = classnames(
  width('w-full'),
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-4'),
  backgroundColor('bg-primary-background'),
  padding('py-6', 'px-4', 'sm:px-6')
)

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
    <div className={cardWrapper}>
      {error && <ErrorMessage withExclamation text={parseErrorText(error)} />}
      {status && (
        <AccentText small color="text-tertiary">
          {status}
        </AccentText>
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
    </div>
  )
}
