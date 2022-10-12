import { Cast } from 'helpers/farcaster'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useSnapshot } from 'valtio'
import Comment from 'models/Comment'
import PostStore, { fetchPost } from 'stores/PostStore'
import farcasterStore, { fetchFarcasterThread } from 'stores/FarcasterStore'
import postIdsStatuses from 'stores/PostIdsStatuses'
import useThread from 'hooks/useThread'

function countComments(comments: Comment[]): number {
  return comments.reduce(
    (count, comment) =>
      count + 1 + (comment.replies ? countComments(comment.replies) : 0),
    0
  )
}

function makeBlockchainCommentNode(
  {
    id,
    timestamp,
    repliedTo,
    replier,
    content,
    threadId,
    replyToId,
  }: {
    threadId: number
    id: number
    timestamp: number
    content: string
    replier: string
    repliedTo: string
    replyToId?: string
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
    replyToId,
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
    replyToId,
  }: {
    threadId: number
    id: number | string
    timestamp: number
    content: string
    replier: string
    repliedTo: string
    replyToId?: string
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
    replyToId,
    replies: [
      ...casts
        .filter((cast) => cast.body.data.replyParentMerkleRoot === id)
        .map((cast) =>
          makeCastCommentNode(
            {
              id: cast.merkleRoot,
              threadId,
              replyToId: cast.merkleRoot,
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
            replyToId: cast.merkleRoot,
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
  const thread = useThread(threadId)
  const { statuses } = useSnapshot(postIdsStatuses)
  const { threadCasts } = useSnapshot(farcasterStore)
  const { posts } = useSnapshot(PostStore)
  const post = posts[threadId + 1]

  if (!thread) return null

  if (!post) {
    fetchPost(threadId + 1)
    return null
  }

  let cast: Readonly<Cast> | undefined
  let farcasterThread: ReadonlyArray<Cast> = []
  let castsComments: Comment[] = []

  if (post && statuses[threadId]) {
    const { serviceId } = statuses[threadId]

    if (serviceId) {
      if (!threadCasts[serviceId]) fetchFarcasterThread(serviceId)
      else {
        farcasterThread = Array.from(threadCasts[serviceId])

        cast = farcasterThread.find((cast) => cast.merkleRoot === serviceId)

        const statusesCopy = { ...statuses }

        const unpublishedPosts = Array.from(thread).filter(
          (post) =>
            !statusesCopy[post.id.toNumber()] ||
            !statusesCopy[post.id.toNumber()].serviceId
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
    cast,
    farcasterThread: farcasterThread,
    comments: castsComments,
    count: countComments(castsComments),
  }
}
