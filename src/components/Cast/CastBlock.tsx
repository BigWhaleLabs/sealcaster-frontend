import { PostStatus } from 'models/PostStatus'
import { Wallet } from 'ethers'
import { handleError, parseErrorText } from '@big-whale-labs/frontend-utils'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostStore from 'stores/PostStore'
import TextArea from 'components/ui/TextArea'
import TextareaInfo from 'components/Cast/TextareaInfo'
import VerifyWallet from 'components/Cast/VerifyWallet'
import getErrorMessage from 'helpers/getErrorMessage'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import walletStore from 'stores/WalletStore'

export default function () {
  const { status } = useSnapshot(BurnerWalletStore)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [text, setText] = useState('')
  const [waitBurner, setWaitBurner] = useState(false)

  const maxLength = 279
  const errorMessage = error ? parseErrorText(error) : ''

  async function createPost() {
    let currentAccount
    const { privateKey } = BurnerWalletStore
    const { account } = walletStore

    if (privateKey) currentAccount = new Wallet(privateKey).address
    if (account && (await hasFarcasterBadge(account))) currentAccount = account

    setError(null)
    try {
      if (!currentAccount) return setWaitBurner(true)

      setIsLoading(true)
      if (PostIdsStatuses.lastUserPost)
        delete PostIdsStatuses.lastUserPost[currentAccount]

      BurnerWalletStore.status = 'Posting cast'
      const result = await PostStore.createPost(text)
      const numberOfPosts = await PostStore.postsAmount
      PostStore.postsAmount = Promise.resolve(numberOfPosts + result.length)
      for (const { id } of result) {
        const blockchainId = id.toNumber()
        const status = PostStatus.pending

        PostIdsStatuses.lastUserPost = {
          ...PostIdsStatuses.lastUserPost,
          [currentAccount]: {
            blockchainId,
            status,
          },
        }
      }
      if (!BurnerWalletStore.used) BurnerWalletStore.used = true
      setText('')
      setWaitBurner(false)
    } catch (error) {
      setError(getErrorMessage(error))
      handleError(error)
      setWaitBurner(false)
    } finally {
      setIsLoading(false)
      BurnerWalletStore.status = ''
    }
  }

  return (
    <div className={space('md:space-y-4', 'space-y-8')}>
      <TextArea
        text={text}
        disabled={isLoading || waitBurner}
        placeholder="Write something here..."
        onTextChange={setText}
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
          loading={isLoading}
          onButtonClick={createPost}
          disabled={!text}
          error={errorMessage}
        />
      )}
    </div>
  )
}
