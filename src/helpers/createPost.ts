import { PostStatus } from 'models/PostStatus'
import { Wallet } from 'ethers'
import { handleError } from '@big-whale-labs/frontend-utils'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostStore from 'stores/PostStore'
import TextFormStore from 'stores/TextFormStore'
import getErrorMessage from 'helpers/getErrorMessage'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import walletStore from 'stores/WalletStore'

export default async function (
  text: string,
  threadId: number,
  replyToId?: string
) {
  TextFormStore.loading = true

  let currentAccount
  const { privateKey } = BurnerWalletStore
  const { account } = walletStore

  if (privateKey) currentAccount = new Wallet(privateKey).address
  if (account && (await hasFarcasterBadge(account))) currentAccount = account

  TextFormStore.error = null

  try {
    if (!currentAccount) {
      TextFormStore.waitBurner = true
      return
    }
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
    TextFormStore.text = ''
    TextFormStore.waitBurner = false
  } catch (error) {
    TextFormStore.error = getErrorMessage(error)
    handleError(error)
    TextFormStore.waitBurner = false
  } finally {
    TextFormStore.loading = false
    BurnerWalletStore.status = ''
  }
}
