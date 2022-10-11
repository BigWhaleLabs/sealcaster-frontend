import { PostStatus } from 'models/PostStatus'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Result } from 'ethers/lib/utils'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import env from 'helpers/env'
import getIdsToPostsTx from 'helpers/getIdsToPostsTx'
import getPostStorage from 'helpers/getPostStorage'
import parsePostLogData from 'helpers/parsePostLogData'
import safeGetThreadFromContract from 'helpers/safeGetThreadFromContract'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'
import walletStore from 'stores/WalletStore'

interface PostStoreType {
  limit: number
  questionDay: number
  posts: { [postId: number]: Promise<PostStructOutput> }
  threads: { [threadId: number]: Promise<PostStructOutput[]> }
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
  questionDay: 8,
  threads: {},
  posts: {},
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

export function fetchPost(postId: number) {
  if (typeof PostStore.posts[postId] !== 'undefined') return
  PostStore.posts[postId - 1] = farcasterContract
    .posts(postId - 1)
    .then(safeTransformPostOutput)
}

farcasterContract.on(
  farcasterContract.filters.PostSaved(),
  (id, post, derivativeAddress, sender, timestamp) => {
    PostStore.posts[id.toNumber()] = Promise.resolve({
      id,
      post,
      derivativeAddress,
      sender,
      timestamp,
    } as PostStructOutput)

    PostIdsStatuses.statuses[id.toNumber()] = Promise.resolve({
      status: PostStatus.pending,
    })
  }
)

export default PostStore
