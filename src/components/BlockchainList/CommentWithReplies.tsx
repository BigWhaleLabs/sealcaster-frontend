import { Cast } from 'models/Cast'
import { LoadingReplies } from 'components/Thread/LoadingPost'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Comment from 'models/Comment'
import CommentBody from 'components/BlockchainList/CommentBody'
import classnames, {
  borderColor,
  borderWidth,
  display,
  flex,
  flexDirection,
  gap,
  margin,
  transitionProperty,
  width,
} from 'classnames/tailwind'
import farcasterStore from 'stores/FarcasterStore'
import postIdsStatuses from 'stores/PostIdsStatuses'
import postStore from 'stores/PostStore'
import useReplies from 'hooks/useReplies'

const repliesWithLine = classnames(display('flex'), margin('mt-3'))
const repliesBlock = classnames(
  display('flex'),
  flexDirection('flex-col'),
  flex('flex-1'),
  gap('gap-y-3')
)
const commentLine = classnames(
  width('w-4'),
  borderWidth('border-l'),
  borderColor(
    'border-primary-semi-dimmed-transparent',
    'hover:border-primary-semi-dimmed'
  ),
  transitionProperty('transition-colors')
)

function makeComment(post?: PostStructOutput, cast?: Cast) {
  if (post && cast) {
    const id = cast?.merkleRoot || post?.id.toNumber()
    const content = cast?.body.data.text || post?.post
    const timestamp = cast?.body.publishedAt
      ? (cast?.body.publishedAt / 1000) ^ 0
      : post?.timestamp.toNumber()

    const replier = post?.sender || `@${cast?.body.username}`
    const replierAddress = post?.derivativeAddress || cast?.body.address

    return {
      id,
      replyToId: cast.merkleRoot,
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
      id: cast.merkleRoot,
      replyToId: cast.merkleRoot,
      replier: `@${cast.body.username}`,
      replierAddress: cast.body.address,
      content: cast.body.data.text,
      timestamp: (cast.body.publishedAt / 1000) ^ 0,
    }
  }

  return null
}

const Replies = ({
  castId,
  postId,
  threadId,
  canReply,
  hideReplies,
}: {
  castId?: string
  postId?: number
  threadId: number
  canReply?: boolean
  hideReplies?: boolean
}) => {
  const { casts } = useSnapshot(farcasterStore)
  const { posts } = useSnapshot(postStore)
  const { idToMerkleRoot } = useSnapshot(postIdsStatuses)

  const cast = castId ? casts[castId] : undefined
  const post = postId ? posts[postId] : undefined

  const data = makeComment(post, cast)

  if (!data) return null

  if (!data.replyToId && postId) {
    const roots = { ...idToMerkleRoot }
    data.replyToId = roots[postId]
  }

  const { id, content, replier, replierAddress, timestamp, replyToId } = data

  if (!replyToId || hideReplies) {
    return (
      <CommentBody
        threadId={threadId}
        content={content}
        replier={replier}
        replierAddress={replierAddress}
        timestamp={timestamp}
        canReply={canReply}
        replyToId={replyToId}
        repliedTo={replier}
      />
    )
  }

  return (
    <CommentWithReplies
      id={id}
      content={content}
      replier={replier}
      replierAddress={replierAddress}
      threadId={threadId}
      timestamp={timestamp}
      replyToId={replyToId}
      canReply={canReply}
      repliedTo={replier}
    />
  )
}

function SuspensedReplies(props: {
  castId?: string
  postId?: number
  threadId: number
  canReply?: boolean
  hideReplies?: boolean
}) {
  return (
    <Suspense fallback={<LoadingReplies />}>
      <Replies {...props} />
    </Suspense>
  )
}

export function CommentWithReplies({
  id: rootId,
  content,
  replier,
  replierAddress,
  repliedTo,
  timestamp,
  threadId,
  replyToId,
  canReply,
}: Comment & {
  replyToId: string
  replierAddress: string
  canReply?: boolean
}) {
  const replies = useReplies({
    threadId,
    replyToId,
  })

  const hasReplies = replies.length > 0

  return (
    <div>
      <CommentBody
        threadId={threadId}
        replyToId={replyToId}
        content={content}
        replier={replier}
        replierAddress={replierAddress}
        repliedTo={repliedTo}
        timestamp={timestamp}
        canReply={canReply}
      />
      {hasReplies && (
        <div className={repliesWithLine}>
          <a className={commentLine} href={`#reply-${rootId}`} />
          <div className={repliesBlock}>
            {replies.map(({ castId, postId }) => (
              <SuspensedReplies
                castId={castId}
                postId={postId}
                threadId={threadId}
                canReply={canReply}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SuspensedReplies
