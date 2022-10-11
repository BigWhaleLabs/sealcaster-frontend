import { Cast } from 'helpers/farcaster'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useSnapshot } from 'valtio'
import Comment from 'models/Comment'
import PostStore, { fetchPost, fetchThread } from 'stores/PostStore'
import farcasterStore, { fetchFarcasterThread } from 'stores/FarcasterStore'
import postIdsStatuses from 'stores/PostIdsStatuses'

function makeBlockchainCommentNode(
  {
    id,
    timestamp,
    repliedTo,
    replier,
    content,
    threadId,
  }: {
    threadId: number
    id: number
    timestamp: number
    content: string
    replier: string
    repliedTo: string
  },
  casts: ReadonlyArray<Cast>,
  posts: PostStructOutput[]
): Comment {
  return {
    id,
    threadId,
    timestamp,
    replier,
    content,
    repliedTo,
    replies: [
      ...posts
        .filter((post) => post.replyToId && +post.replyToId === id)
        .map(({ id, timestamp, sender: replier, post: content }) =>
          makeBlockchainCommentNode(
            {
              id: +id,
              threadId,
              replier,
              content,
              repliedTo,
              timestamp: +timestamp,
            },
            casts,
            posts
          )
        ),
    ],
  }
}

function makeCastCommentNode(
  {
    id,
    timestamp,
    repliedTo,
    replier,
    content,
    threadId,
  }: {
    threadId: number
    id: number | string
    timestamp: number
    content: string
    replier: string
    repliedTo: string
  },
  casts: ReadonlyArray<Cast>,
  posts: PostStructOutput[]
): Comment {
  return {
    id,
    threadId,
    timestamp,
    replier,
    content,
    repliedTo,
    replies: [
      ...casts
        .filter((cast) => cast.body.data.replyParentMerkleRoot === id)
        .map((cast) =>
          makeCastCommentNode(
            {
              id: cast.merkleRoot,
              threadId,
              replier: cast.body.username,
              content: cast.body.data.text,
              timestamp: cast.body.publishedAt,
              repliedTo: cast.merkleRoot,
            },
            casts,
            posts
          )
        ),
      ...posts
        .filter((post) => post.replyToId && +post.replyToId === id)
        .map(({ id, timestamp, sender: replier, post: content }) =>
          makeBlockchainCommentNode(
            {
              id: +id,
              threadId,
              replier,
              content,
              repliedTo,
              timestamp: +timestamp,
            },
            casts,
            posts
          )
        ),
    ],
  }
}

function buildCastCommentTree(
  threadId: number,
  threadCreator: string,
  castThreadId: string,
  casts: ReadonlyArray<Cast>,
  posts: PostStructOutput[]
): Comment[] {
  return [
    ...casts
      .filter((cast) => cast.body.data.replyParentMerkleRoot === castThreadId)
      .map((cast) =>
        makeCastCommentNode(
          {
            id: cast.merkleRoot,
            threadId,
            replier: cast.body.username,
            content: cast.body.data.text,
            timestamp: cast.body.publishedAt,
            repliedTo: threadCreator,
          },
          casts,
          posts
        )
      ),
    ...posts
      .filter((post) => post.replyToId && +post.replyToId === threadId)
      .map(({ id, timestamp, sender: replier, post: content }) =>
        makeBlockchainCommentNode(
          {
            id: +id,
            threadId,
            replier,
            content,
            timestamp: +timestamp,
            repliedTo: threadCreator,
          },
          casts,
          posts
        )
      ),
  ]
}

export default function (threadId: number) {
  const { statuses } = useSnapshot(postIdsStatuses)
  const { threadCasts } = useSnapshot(farcasterStore)
  const { threads, posts } = useSnapshot(PostStore)
  const thread = threads[threadId]
  const post = posts[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  if (!post && threadId !== 0) {
    fetchPost(threadId + 1)
    return null
  }

  let farcasterThread: ReadonlyArray<Cast> = []
  let castsComments: Comment[] = []

  if (post && statuses[threadId]) {
    const { serviceId } = statuses[threadId]

    if (serviceId) {
      if (!threadCasts[serviceId]) fetchFarcasterThread(serviceId)
      else {
        farcasterThread = Array.from(threadCasts[serviceId])

        const unpublishedPosts = Array.from(thread).filter(
          (post) => !statuses[post.id.toNumber()].serviceId
        )

        castsComments = buildCastCommentTree(
          threadId,
          post.sender,
          serviceId,
          farcasterThread,
          unpublishedPosts
        )
      }
    }
  }

  return {
    ...post,
    threadId,
    thread: Array.from(thread),
    farcasterThread: farcasterThread,
    comments: castsComments,
    count: Array.from(thread).length + farcasterThread.length,
  }
}
