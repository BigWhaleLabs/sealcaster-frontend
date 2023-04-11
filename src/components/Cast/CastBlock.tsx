import { JSX } from 'preact/jsx-runtime'
import { parseError } from '@big-whale-labs/frontend-utils'
import { space } from 'classnames/tailwind'
import { useEffect } from 'preact/hooks'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import ReplyIdDefault from 'models/ReplyId'
import TextArea from 'components/ui/TextArea'
import TextFormStore from 'stores/TextFormStore'
import TextareaInfo from 'components/Cast/TextareaInfo'
import VerifyWallet from 'components/Cast/VerifyWallet'
import WalletStore from 'stores/WalletStore'
import createPost from 'helpers/createPost'

export default function ({
  buttonText,
  leftBlock,
  placeHolder = 'Write something here...',
  replyToId = ReplyIdDefault,
  threadId,
}: {
  placeHolder?: string
  threadId: number
  replyToId?: string
  leftBlock?: JSX.Element | string
  buttonText?: string
}) {
  const { account } = useSnapshot(WalletStore)
  const { error, loading, replyToText } = useSnapshot(TextFormStore, {
    sync: true,
  })
  const text = replyToText[replyToId] || ''
  const { status } = useSnapshot(BurnerWalletStore)
  const maxLength = 279
  const errorMessage = error[replyToId] ? parseError(error[replyToId]) : ''
  const showStatus = loading[replyToId] || !!error[replyToId]

  useEffect(() => {
    if (
      account &&
      TextFormStore.error[replyToId] &&
      !TextFormStore.loading[replyToId]
    )
      void createPost({
        askReconnect: false,
        replyToId,
        ['text']: TextFormStore.replyToText[replyToId] || '',
        threadId,
      })
  }, [account, replyToId, threadId])

  return (
    <div className={space('md:space-y-4', 'space-y-8')}>
      <TextArea
        disabled={showStatus}
        maxLength={maxLength}
        placeholder={placeHolder}
        text={text}
        onTextChange={(text) => {
          TextFormStore.replyToText[replyToId] = text
        }}
      />
      {showStatus ? (
        <VerifyWallet
          error={error[replyToId]}
          status={status}
          text={
            BurnerWalletStore.status === 'Posting cast'
              ? 'Hang tight! We’re casting now.'
              : 'We need to verify that you are indeed a Farcaster user. Please connect the wallet you have connected to Farcaster to attest your identity. Don’t worry, we will not use this wallet to post or to point back to you in any way.'
          }
          onButtonClick={() => {
            TextFormStore.error[replyToId] = null
          }}
        />
      ) : (
        <TextareaInfo
          buttonText={buttonText}
          disabled={!text}
          error={errorMessage}
          leftBlock={leftBlock}
          loading={loading[replyToId]}
          onButtonClick={() => {
            void createPost({ replyToId, text, threadId })
          }}
        />
      )}
    </div>
  )
}
