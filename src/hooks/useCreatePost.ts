import { PostStatus } from 'models/PostStatus'
import { Wallet } from 'ethers'
import { handleError } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BurnerInteractionStore from 'stores/BurnerInteractionStore'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostStore from 'stores/PostStore'
import getErrorMessage from 'helpers/getErrorMessage'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import walletStore from 'stores/WalletStore'

export default function (threadId: number, replyToId?: string) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>()
  const [text, setText] = useState('')

  async function createPost() {
    setIsLoading(true)

    let currentAccount
    const { privateKey } = BurnerWalletStore
    const { account } = walletStore

    if (privateKey) currentAccount = new Wallet(privateKey).address
    if (account && (await hasFarcasterBadge(account))) currentAccount = account

    setError(null)

    try {
      if (!currentAccount) {
        if (!account) await walletStore.connect(true)
        if (!walletStore.account) throw 'Please, connect the wallet'
        await BurnerWalletStore.generateBurnerWallet(walletStore.account)
        if (!BurnerWalletStore.privateKey)
          throw 'Failed to generate burner wallet'
        currentAccount = new Wallet(BurnerWalletStore.privateKey).address
        walletStore.exit()
        BurnerInteractionStore.interactionClosed = false
      }

      if (!currentAccount)
        throw 'An error occurred while creating the burner wallet'

      if (PostIdsStatuses.lastUserPost)
        delete PostIdsStatuses.lastUserPost[currentAccount]

      BurnerWalletStore.status = 'Posting cast'
      const result = await PostStore.createPost(text, threadId, replyToId)

      for (const { id } of result) {
        const status = PostStatus.pending

        PostIdsStatuses.lastUserPost = {
          ...PostIdsStatuses.lastUserPost,
          [currentAccount]: {
            id: id.toNumber(),
            status,
          },
        }
      }
      if (!BurnerWalletStore.used) BurnerWalletStore.used = true

      setText('')
    } catch (error) {
      let errorMessage = getErrorMessage(error)
      if (
        typeof errorMessage === 'string' &&
        errorMessage.includes('user rejected signing')
      )
        errorMessage = 'Please sign the transaction to create a burner wallet'

      setError(
        typeof errorMessage === 'string'
          ? errorMessage
          : 'We could not match the username with the wallet you have connected. Please review them and try again.'
      )
      handleError(
        typeof errorMessage === 'string'
          ? new Error(errorMessage)
          : errorMessage
      )
    } finally {
      setIsLoading(false)
      BurnerWalletStore.status = ''
      walletStore.exit()
    }
  }

  return {
    createPost,
    isLoading,
    error,
    text,
    setText,
  }
}
