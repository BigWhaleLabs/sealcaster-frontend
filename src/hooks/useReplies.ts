import { useSnapshot } from 'valtio'
import Comment from 'models/Comment'
import postIdsStatuses from 'stores/PostIdsStatuses'
import useFarcasterThread from 'hooks/useFarcasterThread'
import useThread from 'hooks/useThread'

export default function ({
  threadId,
  threadMerkleRoot,
  replyToId,
}: {
  threadId: number
  threadMerkleRoot?: string
  replyToId: string
}): Comment[] {
  const blockchainThread = useThread(threadId)
  const farcasterThread = useFarcasterThread(threadMerkleRoot)
  const { idToMerkleRoot } = useSnapshot(postIdsStatuses)

  const farcasterReplies = farcasterThread
    ? farcasterThread.filter(
        (cast) => cast.body.data.replyParentMerkleRoot === replyToId
      )
    : []

  const idToMerkleRootCopy = { ...idToMerkleRoot }
  const blockchainReplies = blockchainThread
    ? blockchainThread.filter(
        (post) =>
          post.replyToId === replyToId &&
          !idToMerkleRootCopy[post.id.toNumber() - 1]
      )
    : []

  return [
    ...farcasterReplies.map((cast) => ({
      id: cast.merkleRoot,
      threadId,
      replier: cast.body.username,
      content: cast.body.data.text,
      timestamp: (cast.body.publishedAt / 1000) ^ 0,
      replyToId: cast.merkleRoot,
    })),
    ...blockchainReplies.map(
      ({ id, timestamp, sender: replier, post: content }) => ({
        id: +id,
        threadId,
        replier,
        content,
        timestamp: +timestamp,
      })
    ),
  ]
}
