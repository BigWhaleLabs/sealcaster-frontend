import { BodyText, ErrorText } from 'components/ui/Text'
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
  const CardSubtitle = () => (
    <>
      <BodyText center>{text}</BodyText>
      {error && onButtonClick && (
        <Button
          center
          small
          fullWidthOnMobile
          type="primary"
          onClick={onButtonClick}
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
