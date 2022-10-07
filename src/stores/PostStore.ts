import { PostStatus } from 'models/PostStatus'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Result } from 'ethers/lib/utils'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import env from 'helpers/env'
import getIdsToPostsTx from 'helpers/getIdsToPostsTx'
import getMorePosts from 'helpers/getMorePosts'
import getPostStorage from 'helpers/getPostStorage'
import parsePostLogData from 'helpers/parsePostLogData'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'
import safeGetThreadFromContract from 'helpers/safeGetThreadFromContract'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'
import walletStore from 'stores/WalletStore'

interface PostStoreType {
  limit: number
  questionDay: Promise<PostStructOutput>
  posts: Promise<PostStructOutput[]>
  threads: { [threadId: number]: Promise<PostStructOutput[]> }
  postsAmount: Promise<number>
  selectedToken?: string
  createPost: (
    text: string,
    threadId: number,
    replyToId: number
  ) => Promise<Result[]>
  idToPostTx: Promise<string[]>
}

const farcasterContract = getPostStorage()

const limit = 100

const PostStore = proxy<PostStoreType>({
  limit,
  questionDay: farcasterContract.posts(0).then(safeTransformPostOutput),
  postsAmount: safeGetPostsAmountFromContract(farcasterContract),
  threads: {},
  posts: getMorePosts({
    contract: farcasterContract,
  }),
  selectedToken: undefined,
  idToPostTx: getIdsToPostsTx(farcasterContract),
  createPost: async (text: string, threadId: number, replyToId: number) => {
    let signer = await BurnerWalletStore.getSigner()

    if (!signer && (await walletStore.hasFarcasterBadge))
      signer = await walletStore.getSigner()

    if (!signer) throw new Error('Not found burner wallet!')

    const contract = SCPostStorage__factory.connect(
      env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS,
      signer
    )

    const transaction = await contract.savePost(
      text,
      'farcaster',
      threadId,
      replyToId
    )
    const result = await transaction.wait()

    return Promise.all(
      result.logs
        .filter(({ address }) => address === contract.address)
        .map(({ data, topics }) => parsePostLogData({ data, topics }))
        .map(({ args }) => args)
    )
  },
})

export function fetchThread(threadId: number) {
  if (typeof PostStore.threads[threadId] !== 'undefined') return
  PostStore.threads[threadId] = safeGetThreadFromContract(
    threadId,
    farcasterContract
  )
}

farcasterContract.on(
  farcasterContract.filters.PostSaved(),
  async (id, post, derivativeAddress, sender, timestamp) => {
    const posts = await PostStore.posts
    PostStore.posts = Promise.resolve([
      {
        id,
        post,
        derivativeAddress,
        sender,
        timestamp,
      } as PostStructOutput,
      ...posts,
    ])
    PostIdsStatuses.statuses[id.toNumber()] = Promise.resolve({
      status: PostStatus.pending,
    })
  }
)

export default PostStore
