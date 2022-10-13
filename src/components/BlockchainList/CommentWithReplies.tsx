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
  threadMerkleRoot,
  id,
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
  threadId,
  isThreadOwned,
  replyToId,
}: Comment & {
  threadMerkleRoot: string
}) => {
  if (!replyToId) {
    return (
      <CommentBody
        threadId={threadId}
        replyToId={replyToId}
        content={content}
        replier={replier}
        repliedTo={repliedTo}
        timestamp={timestamp}
        isThreadOwned={isThreadOwned}
      />
    )
  }

  return (
    <CommentWithReplies
      threadMerkleRoot={threadMerkleRoot}
      id={id}
      content={content}
      repliedTo={repliedTo}
      replier={replier}
      threadId={threadId}
      timestamp={timestamp}
      replies={replies}
      isThreadOwned={isThreadOwned}
      replyToId={replyToId}
    />
  )
}

export function CommentWithReplies({
  id: rootId,
  content,
  replier,
  repliedTo,
  timestamp,
  threadId,
  replyToId,
  isThreadOwned,
  threadMerkleRoot,
}: Comment & {
  threadMerkleRoot: string
  replyToId: string
}) {
  const replies = useReplies({
    threadId,
    threadMerkleRoot,
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
        repliedTo={repliedTo}
        timestamp={timestamp}
        isThreadOwned={isThreadOwned}
      />

      {hasReplies && (
        <div className={repliesWithLine}>
          <a className={commentLine} href={`#reply-${rootId}`} />
          <div className={repliesBlock}>
            {replies.map(
              ({
                id,
                content,
                replier,
                repliedTo,
                timestamp,
                replies,
                replyToId,
              }) => (
                <Replies
                  id={id}
                  threadId={threadId}
                  content={content}
                  replier={replier}
                  repliedTo={repliedTo}
                  timestamp={timestamp}
                  replies={replies}
                  isThreadOwned={isThreadOwned}
                  replyToId={replyToId}
                  threadMerkleRoot={threadMerkleRoot}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default function (
  props: Comment & {
    threadMerkleRoot: string
  }
) {
  if (props.replyToId)
    return <CommentWithReplies {...props} replyToId={props.replyToId} />

  return <CommentBody {...props} />
}
