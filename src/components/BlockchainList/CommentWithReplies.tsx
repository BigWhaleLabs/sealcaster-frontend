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
  id,
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
  threadId,
  isThreadOwned,
  replyToId,
}: Comment) => {
  return (
    <CommentWithReplies
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

export default function CommentWithReplies({
  id: rootId,
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
  threadId,
  replyToId,
  isThreadOwned,
}: Comment) {
  const hasReplies = !!replies?.length

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
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
