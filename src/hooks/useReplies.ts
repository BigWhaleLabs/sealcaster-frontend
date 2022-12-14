import useFarcasterThread from 'hooks/useFarcasterThread'
import useThread from 'hooks/useThread'

export default function ({
  threadId,
  replyToId,
  allowFetch = true,
}: {
  threadId: number
  replyToId: string
  allowFetch?: boolean
}): { castId?: string; postId?: number; timestamp: number }[] {
  const blockchainThread = useThread(threadId, allowFetch)
  const farcasterThread = useFarcasterThread(threadId, allowFetch)

  const farcasterThreadPostIds = farcasterThread
    ? new Set(
        farcasterThread.reduce(
          (ids, cast) => (cast.postId ? [cast.postId, ...ids] : ids),
          [] as number[]
        )
      )
    : new Set()

  const farcasterReplies = farcasterThread
    ? farcasterThread.filter(
        (cast) => cast.body.data.replyParentMerkleRoot === replyToId
      )
    : []

  const blockchainReplies = blockchainThread
    ? blockchainThread.filter(
        (post) =>
          post.replyToId === replyToId &&
          !farcasterThreadPostIds.has(post.id.toNumber())
      )
    : []

  return [
    ...farcasterReplies.map((cast) => ({
      castId: cast.merkleRoot,
      postId: cast.postId,
      timestamp: (cast.body.publishedAt / 1000) ^ 0,
    })),
    ...blockchainReplies.map(({ id, timestamp }) => ({
      postId: +id,
      timestamp: timestamp.toNumber(),
    })),
  ].sort((a, b) => b.timestamp - a.timestamp)
}
