import { BodyText, ErrorText } from 'components/ui/Text'
import LoadingBlock from 'components/ui/LoadingBlock'
import SealSad from 'icons/SealSad'

export default function ({
  text,
  status,
  error,
}: {
  status: string
  text: string
  error?: string
}) {
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
      subtitle={<BodyText center>{text}</BodyText>}
    />
  )
}
