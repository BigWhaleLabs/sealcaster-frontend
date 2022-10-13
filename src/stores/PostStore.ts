import { PostStatus } from 'models/PostStatus'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Result } from 'ethers/lib/utils'
import { SCPostStorage__factory } from '@big-whale-labs/seal-cred-posts-contract'
import { proxy } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import PostIdsStatuses, { updateStatuses } from 'stores/PostIdsStatuses'
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
  questionDay: 1,
  threads: {},
  posts: {},
  idToPostTx: getIdsToPostsTx(farcasterContract),
  createPost: async (text: string, threadId: number, replyToId?: string) => {
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
      replyToId ||
        '0x0000000000000000000000000000000000000000000000000000000000000000'
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

  const request = safeGetThreadFromContract(threadId, farcasterContract)

  PostStore.threads[threadId] = request.then((posts) =>
    posts.map((post) => post.id.toNumber())
  )

  void request.then((posts) => {
    for (const post of posts) {
      PostStore.posts[post.id.toNumber()] = Promise.resolve(post)
    }
    void updateStatuses(posts.map((post) => post.id.toNumber()))
  })
}

export function fetchPost(postId: number) {
  if (typeof PostStore.posts[postId] !== 'undefined') return
  PostStore.posts[postId] = farcasterContract
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

    PostIdsStatuses.statuses[id.toNumber()] = Promise.resolve(
      PostStatus.pending
    )
  }
)

export default PostStore
