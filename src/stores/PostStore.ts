import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Result } from 'ethers/lib/utils'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import env from 'helpers/env'
import getMorePosts from 'helpers/getMorePosts'
import getPostStorage from 'helpers/getPostStorage'
import parsePostLogData from 'helpers/parsePostLogData'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'
import walletStore from 'stores/WalletStore'

interface PostStoreType {
  limit: number
  posts: Promise<PostStructOutput[]>
  postsAmount: Promise<number>
  selectedToken?: string
  createPost: (text: string) => Promise<Result[]>
}

const limit = 100

const PostStore = proxy<PostStoreType>({
  limit,
  postsAmount: safeGetPostsAmountFromContract(getPostStorage()),
  posts: getMorePosts({
    contract: getPostStorage(),
    limitAmount: limit,
  }),
  selectedToken: undefined,
  createPost: async (text: string) => {
    let signer = await BurnerWalletStore.getSigner()

    if (!signer && (await walletStore.isBurnedWallet)) {
      signer = await walletStore.getSigner()
    }

    if (!signer) throw new Error('Not found burner wallet!')

    const contract = SCPostStorage__factory.connect(
      env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS,
      signer
    )

    const transaction = await contract.savePost(text, 'farcaster')
    const result = await transaction.wait()

    return Promise.all(
      result.logs
        .filter(({ address }) => address === contract.address)
        .map(({ data, topics }) => parsePostLogData({ data, topics }))
        .map(({ args }) => args)
    )
  },
})

export default PostStore
