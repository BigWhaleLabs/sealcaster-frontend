import { Cast } from 'models/Cast'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'

function parseCastTimestamp(timestamp: number) {
  return (timestamp / 1000) ^ 0
}

export default function makeComment(post?: PostStructOutput, cast?: Cast) {
  if (post && cast) {
    const id = cast?.hash || post?.id.toNumber()
    const content = cast?.text || post?.post
    const timestamp = cast?.timestamp
      ? parseCastTimestamp(cast.timestamp)
      : post?.timestamp.toNumber()

    const replier = post?.sender || `@${cast?.author.username}`
    const replierAddress = post?.derivativeAddress || ''
    const replyToId = cast.hash

    return {
      id,
      replyToId,
      content,
      timestamp,
      replier,
      replierAddress,
    }
  }

  if (post) {
    return {
      id: post.id.toNumber(),
      replier: post.sender,
      replierAddress: post.derivativeAddress,
      content: post.post,
      timestamp: post.timestamp.toNumber(),
    }
  }

  if (cast) {
    return {
      id: cast.hash,
      replyToId: cast.hash,
      replier: `@${cast.author.username}`,
      content: cast?.text,
      timestamp: parseCastTimestamp(cast.timestamp),
    }
  }

  return null
}
