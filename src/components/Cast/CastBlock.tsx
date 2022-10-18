import { JSX } from 'preact/jsx-runtime'
import { parseErrorText } from '@big-whale-labs/frontend-utils'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import TextArea from 'components/ui/TextArea'
import TextFormStore from 'stores/TextFormStore'
import TextareaInfo from 'components/Cast/TextareaInfo'
import VerifyWallet from 'components/Cast/VerifyWallet'
import useCreatePost from 'hooks/useCreatePost'

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
  const { status } = useSnapshot(BurnerWalletStore)
  const { createPost, loading, error, text, waitBurner } = useCreatePost(
    threadId,
    replyToId
  )
  const maxLength = 279
  const errorMessage = error ? parseErrorText(error) : ''

  return (
    <div className={space('md:space-y-4', 'space-y-8')}>
      <TextArea
        text={text}
        disabled={loading || waitBurner}
        placeholder={placeHolder}
        onTextChange={(text) => {
          TextFormStore.text = text
        }}
        maxLength={maxLength}
      />
      {waitBurner ? (
        <VerifyWallet
          onCreateBurner={createPost}
          status={status}
          text={
            BurnerWalletStore.status === 'Posting cast'
              ? 'Hang tight! We’re casting now.'
              : 'We need to verify that you are indeed a Farcaster user. Please connect the wallet you have connected to Farcaster to attest your identity. Don’t worry, we will not use this wallet to post or to point back to you in any way.'
          }
        />
      ) : (
        <TextareaInfo
          loading={loading}
          onButtonClick={createPost}
          disabled={!text}
          error={errorMessage}
          leftBlock={leftBlock}
          buttonText={buttonText}
        />
      )}
    </div>
  )
}
