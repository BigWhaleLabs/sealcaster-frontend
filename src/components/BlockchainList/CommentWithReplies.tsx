import Comment from 'models/Comment'
import CommentBody from 'components/BlockchainList/CommentBody'
import classnames, {
  backgroundColor,
  borderColor,
  borderStyle,
  borderWidth,
  display,
  flex,
  flexDirection,
  gap,
  height,
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
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
}: Comment) => {
  return (
    <CommentWithReplies
      content={content}
      replier={replier}
      repliedTo={repliedTo}
      timestamp={timestamp}
      replies={replies}
    />
  )
}

export default function CommentWithReplies({
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
}: Comment) {
  const hasReplies = !!replies?.length

  return (
    <div>
      <CommentBody
        content={content}
        replier={replier}
        repliedTo={repliedTo}
        timestamp={timestamp}
      />

      {hasReplies && (
        <div className={repliesWithLine}>
          <a className={commentLine} href="#comment-1" />
          <div className={repliesBlock}>
            {replies.map(
              ({ content, replier, repliedTo, timestamp, replies }) => (
                <Replies
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
