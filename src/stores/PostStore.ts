import { BigNumber } from 'ethers'
import { PostStatus } from 'models/PostStatus'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Result, hexZeroPad } from 'ethers/lib/utils'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import QuestionOfDayStore from 'stores/QuestionOfDayStore'
import ReplyIdDefault from 'models/ReplyId'
import env from 'helpers/env'
import getIdsToPostsTx from 'helpers/getIdsToPostsTx'
import getPostStorage from 'helpers/getPostStorage'
import parsePostLogData from 'helpers/parsePostLogData'
import safeGetThreadFromContract from 'helpers/safeGetThreadFromContract'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'
import walletStore from 'stores/WalletStore'

interface PostStoreType {
  limit: number
  countPosts: Promise<BigNumber>
  posts: { [postId: number]: Promise<PostStructOutput> }
  requested: { [postId: number]: boolean }
  threads: { [threadId: number]: Promise<number[]> }
  createPost: (
    text: string,
    threadId: number,
    replyToId?: string
  ) => Promise<Result[]>
  idToPostTx: Promise<string[]>
}

const farcasterContract = getPostStorage()

const limit = 20

const PostStore = proxy<PostStoreType>({
  limit,
  countPosts: farcasterContract.currentPostId(),
  threads: {},
  posts: {},
  requested: {},
  idToPostTx: getIdsToPostsTx(farcasterContract),
  createPost: async (text: string, threadId: number, replyToId?: string) => {
    let signer = await BurnerWalletStore.getSigner()

    if (!signer && (await walletStore.hasFarcasterBadge)) {
      await walletStore.checkNetowrkAndRequestChange()
      signer = await walletStore.getSigner()
    }

    if (!signer) throw new Error('Not found burner wallet!')

    const contract = SCPostStorage__factory.connect(
      env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS,
      signer
    )

    const transaction = await contract.savePost(
      text,
      'farcaster',
      threadId,
      hexZeroPad(replyToId || ReplyIdDefault, 32)
    )
    const result = await transaction.wait()

    if (result.events) {
      const savedTx = await PostStore.idToPostTx
      PostStore.idToPostTx = Promise.resolve([
        ...savedTx,
        result.events[0].transactionHash,
      ])
    }

    return Promise.all(
      result.logs
        .filter(({ address }) => address === contract.address)
        .map(({ data, topics }) => parsePostLogData({ data, topics }))
        .map(({ args }) => args)
    )
  },
})

subscribeKey(PostStore, 'posts', (posts) => {
  const postsIds = Object.keys(posts).map((id) => +id)
  const statuses = { ...PostIdsStatuses.statuses }
  const idWithoutStatus = postsIds
    .filter((id) => !statuses[id])
    .reduce((acc, id) => {
      acc[id] = Promise.resolve(PostStatus.pending)
      return acc
    }, {} as { [postId: number]: Promise<PostStatus> })
  PostIdsStatuses.statuses = { ...statuses, ...idWithoutStatus }
})

export async function fetchThread(threadId: number) {
  if (PostStore.requested[threadId]) return

  PostStore.requested[threadId] = true

  try {
    const posts = await safeGetThreadFromContract(threadId, farcasterContract)
    const postsIds = posts.map((post) => post.id.toNumber())
    PostStore.threads[threadId] = Promise.resolve(postsIds)
    posts.forEach((post) => {
      PostStore.posts[post.id.toNumber()] = Promise.resolve(post)
    })
  } finally {
    PostStore.requested[threadId] = false
  }
}

export async function fetchPost(postId: number) {
  if (
    typeof PostStore.posts[postId] !== 'undefined' ||
    (await PostStore.countPosts).lt(postId)
  )
    return

  // Numbering in .posts() starts from zero
  PostStore.posts[postId] = farcasterContract
    .posts(postId - 1)
    .then(safeTransformPostOutput)
}

farcasterContract.on(
  farcasterContract.filters.PostSaved(),
  async (
    id,
    post,
    derivativeAddress,
    sender,
    timestamp,
    threadId,
    replyToId
  ) => {
    PostStore.countPosts = Promise.resolve(id)
    PostStore.posts[id.toNumber()] = Promise.resolve({
      id,
      post,
      derivativeAddress,
      sender,
      timestamp,
      threadId,
      replyToId,
    } as PostStructOutput)

    const thread = (await PostStore.threads[threadId.toNumber()]) || []

    PostStore.threads[threadId.toNumber()] = Promise.resolve([
      ...thread,
      id.toNumber(),
    ])

    PostIdsStatuses.statuses[id.toNumber()] = Promise.resolve(
      PostStatus.pending
    )

    const postsTx = await getIdsToPostsTx(farcasterContract)
    PostStore.idToPostTx = Promise.resolve(postsTx)

    const replyToAll = await QuestionOfDayStore.qodAddress
    if (sender !== replyToAll) return

    const allQodPostIds = await QuestionOfDayStore.allQodPostIds
    QuestionOfDayStore.allQodPostIds = Promise.resolve([
      id.toNumber(),
      ...allQodPostIds,
    ])
  }
)

export default PostStore
