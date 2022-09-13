import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Result } from 'ethers/lib/utils'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
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
  createPost: ({
    text,
    original,
  }: {
    text: string
    original: string
  }) => Promise<Result[]>
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
  createPost: async ({
    text,
    original,
  }: {
    text: string
    original: string
  }) => {
    const provider = await walletStore.getProvider()

    const contract = SCPostStorage__factory.connect(
      env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS,
      provider.getSigner(0)
    )
    const transaction = await contract.savePost(text, original)
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
