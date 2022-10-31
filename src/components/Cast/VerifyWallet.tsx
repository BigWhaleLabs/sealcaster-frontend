import { BodyText, ErrorText } from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import LoadingBlock from 'components/ui/LoadingBlock'
import SealSad from 'icons/SealSad'

export default function ({
  text,
  status,
  error,
  onButtonClick,
}: {
  status: string
  text: string
  error?: unknown
  onButtonClick?: () => void
}) {
  const [isGSNError, setIsGSNError] = useState(
    error && typeof error === 'string' && error.includes('Failed to relay call')
  )

  const CardSubtitle = () => (
    <>
      <BodyText center>{text}</BodyText>
      {isGSNError && onButtonClick && (
        <Button
          center
          small
          fullWidthOnMobile
          type="primary"
          onClick={() => {
            setIsGSNError(false)
            onButtonClick()
          }}
        >
          Retry to cast
        </Button>
      )}
    </>
  )

  return (
    <LoadingBlock
      loadingText={status || 'Preparing cast'}
      errorBlock={
        error ? (
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
        ) : undefined
      }
      subtitle={<CardSubtitle />}
    />
  )
}
