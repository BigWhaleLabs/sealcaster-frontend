import { PostStatus } from 'models/PostStatus'
import { Wallet } from 'ethers'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostStore from 'stores/PostStore'
import getErrorMessage from 'helpers/getErrorMessage'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import walletStore from 'stores/WalletStore'

export default function (threadId: number, replyToId: number) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [text, setText] = useState('')
  const [waitBurner, setWaitBurner] = useState(false)

  async function createPost() {
    setIsLoading(true)

    let currentAccount
    const { privateKey } = BurnerWalletStore
    const { account } = walletStore

    if (privateKey) currentAccount = new Wallet(privateKey).address
    if (account && (await hasFarcasterBadge(account))) currentAccount = account

    setError(null)
    try {
      if (!currentAccount) return setWaitBurner(true)
      if (PostIdsStatuses.lastUserPost)
        delete PostIdsStatuses.lastUserPost[currentAccount]

      BurnerWalletStore.status = 'Posting cast'
      const result = await PostStore.createPost(text, threadId, replyToId)
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

  return {
    createPost,
    isLoading,
    error,
    waitBurner,
    text,
    setText,
  }
}
