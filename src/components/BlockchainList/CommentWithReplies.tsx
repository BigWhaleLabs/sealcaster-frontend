import Comment from 'models/Comment'
import CommentBody from 'components/BlockchainList/CommentBody'
import classnames, {
  backgroundColor,
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
const indent = width('w-4')
const commentLine = classnames(
  display('flex'),
  width('w-0.5'),
  height('h-full'),
  backgroundColor(
    'bg-primary-semi-dimmed-transparent',
    'hover:bg-primary-semi-dimmed'
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
          <div className={indent}>
            <a href="#comment-1" className={commentLine} />
          </div>
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
