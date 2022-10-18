import { JSX } from 'preact/jsx-runtime'
import { parseErrorText } from '@big-whale-labs/frontend-utils'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import TextArea from 'components/ui/TextArea'
import TextFormStore from 'stores/TextFormStore'
import TextareaInfo from 'components/Cast/TextareaInfo'
import VerifyWallet from 'components/Cast/VerifyWallet'
import createPost from 'helpers/createPost'

export default function ({
  placeHolder = 'Write something here...',
  threadId,
  replyToId,
  buttonText,
  leftBlock,
}: {
  placeHolder?: string
  threadId: number
  replyToId?: string
  leftBlock?: JSX.Element | string
  buttonText?: string
}) {
  const { text, loading, error } = useSnapshot(TextFormStore, {
    sync: true,
  })
  const { status } = useSnapshot(BurnerWalletStore)
  const maxLength = 279
  const errorMessage = error ? parseErrorText(error) : ''

  return (
    <div className={space('md:space-y-4', 'space-y-8')}>
      <TextArea
        text={text}
        disabled={loading}
        placeholder={placeHolder}
        onTextChange={(text) => {
          TextFormStore.text = text
        }}
        maxLength={maxLength}
      />
      {loading || error ? (
        <VerifyWallet
          status={status}
          text={
            BurnerWalletStore.status === 'Posting cast'
              ? 'Hang tight! We’re casting now.'
              : 'We need to verify that you are indeed a Farcaster user. Please connect the wallet you have connected to Farcaster to attest your identity. Don’t worry, we will not use this wallet to post or to point back to you in any way.'
          }
          error={error}
        />
      ) : (
        <TextareaInfo
          loading={loading}
          onButtonClick={() => {
            void createPost(text, threadId, replyToId)
          }}
          disabled={!text}
          error={errorMessage}
          leftBlock={leftBlock}
          buttonText={buttonText}
        />
      )}
    </div>
  )
}
