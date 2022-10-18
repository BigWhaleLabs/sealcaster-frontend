import { PostStatus } from 'models/PostStatus'
import { Wallet } from 'ethers'
import { handleError } from '@big-whale-labs/frontend-utils'
import BurnerInteractionStore from 'stores/BurnerInteractionStore'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import PostStore from 'stores/PostStore'
import TextFormStore from 'stores/TextFormStore'
import getErrorMessage from 'helpers/getErrorMessage'
import hasFarcasterBadge from 'helpers/hasFarcasterBadge'
import walletStore from 'stores/WalletStore'

export default async function ({
  text,
  threadId,
  replyToId,
  askReconnect = true,
}: {
  text: string
  threadId: number
  replyToId?: string
  askReconnect?: boolean
}) {
  TextFormStore.loading = true
  TextFormStore.error = null

  let currentAccount
  const { privateKey } = BurnerWalletStore
  let { account } = walletStore

  if (privateKey) currentAccount = new Wallet(privateKey).address
  if (account && (await hasFarcasterBadge(account))) currentAccount = account

  try {
    if (!currentAccount) {
      if (!account && askReconnect) account = await walletStore.connect(true)
      if (!account) throw 'Please, connect an account with badge'

      const newPrivateKey = await BurnerWalletStore.generateBurnerWallet(
        account
      )
      if (!newPrivateKey)
        throw 'An error occurred while creating the burner wallet, please try again'
      currentAccount = new Wallet(newPrivateKey).address
      walletStore.exit()
      BurnerInteractionStore.interactionClosed = false
    }

    if (!currentAccount)
      throw 'An error ocurred while using your burner wallet, please try again'

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
  } catch (error) {
    TextFormStore.error = getErrorMessage(error)
    handleError(error)
  } finally {
    TextFormStore.loading = false
    BurnerWalletStore.status = ''
  }
}
