import Comment from 'models/Comment'
import CommentBody from 'components/BlockchainList/CommentBody'
import ReplyModel from 'models/ReplyModel'
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
  replyToId,
}: Comment & ReplyModel) => {
  return (
    <CommentWithReplies
      threadId={threadId}
      id={id}
      replyToId={replyToId}
      content={content}
      replier={replier}
      repliedTo={repliedTo}
      timestamp={timestamp}
      replies={replies}
    />
  )
}

export default function CommentWithReplies({
  id,
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
  threadId,
}: Comment & ReplyModel) {
  const hasReplies = !!replies?.length

  return (
    <div>
      <CommentBody
        threadId={threadId}
        replyToId={id}
        content={content}
        replier={replier}
        repliedTo={repliedTo}
        timestamp={timestamp}
      />

      {hasReplies && (
        <div className={repliesWithLine}>
          {/* TODO: href should be real */}
          <a className={commentLine} href="#reply-1" />
          <div className={repliesBlock}>
            {replies.map(
              ({ content, replier, repliedTo, timestamp, replies, id }) => (
                <Replies
                  id={id}
                  threadId={threadId}
                  content={content}
                  replier={replier}
                  repliedTo={repliedTo}
                  timestamp={timestamp}
                  replies={replies}
                />
              )
            )}
          </div>
        </div>
      )}
    </div>
  )
}
