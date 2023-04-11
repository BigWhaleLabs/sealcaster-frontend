import { LoadingReplies } from 'components/Thread/LoadingPost'
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
import makeComment from 'helpers/makeComment'
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

const Replies = ({
  canReply,
  castId,
  hideReplies,
  postId,
  threadId,
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

  const { content, id, replier, replierAddress, replyToId, timestamp } = data

  if (!replyToId || hideReplies) {
    return (
      <CommentBody
        canReply={canReply}
        content={content}
        repliedTo={replier}
        replier={replier}
        replierAddress={replierAddress}
        replyToId={replyToId}
        threadId={threadId}
        timestamp={timestamp}
      />
    )
  }

  return (
    <CommentWithReplies
      canReply={canReply}
      content={content}
      id={id}
      repliedTo={replier}
      replier={replier}
      replierAddress={replierAddress}
      replyToId={replyToId}
      threadId={threadId}
      timestamp={timestamp}
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
  canReply,
  content,
  id: rootId,
  repliedTo,
  replier,
  replierAddress,
  replyToId,
  threadId,
  timestamp,
}: Comment & {
  replyToId: string
  replierAddress?: string
  canReply?: boolean
}) {
  const replies = useReplies({
    allowFetch: false,
    replyToId,
    threadId,
  })

  const hasReplies = replies.length > 0

  return (
    <div>
      <CommentBody
        canReply={canReply}
        content={content}
        repliedTo={repliedTo}
        replier={replier}
        replierAddress={replierAddress}
        replyToId={replyToId}
        threadId={threadId}
        timestamp={timestamp}
      />
      {hasReplies && (
        <div className={repliesWithLine}>
          <a className={commentLine} href={`#reply-${rootId}`} />
          <div className={repliesBlock}>
            {replies.map(({ castId, postId }) => (
              <SuspensedReplies
                canReply={canReply}
                castId={castId}
                postId={postId}
                threadId={threadId}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SuspensedReplies
