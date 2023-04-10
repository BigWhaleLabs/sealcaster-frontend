import { BodyText, ErrorText } from 'components/ui/Text'
import Button from 'components/ui/Button'
import LoadingBlock from 'components/ui/LoadingBlock'
import SealSad from 'icons/SealSad'

export default function ({
  error,
  onButtonClick,
  status,
  text,
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
          fullWidthOnMobile
          small
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
      subtitle={<CardSubtitle />}
      errorBlock={
        error ? (
          <>
            <SealSad
              noMobile
              sealColor="stroke-accent"
              triangleColor="stroke-error"
            />
            <ErrorText centered>
              Verification failed. Please double check that the wallet you’re
              connecting is the same as the one you have connected to Farcaster.
            </ErrorText>
          </>
        ) : undefined
      }
    />
  )
}
