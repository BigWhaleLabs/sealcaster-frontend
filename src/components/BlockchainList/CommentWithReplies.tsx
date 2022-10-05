import Comment from 'components/BlockchainList/Comment'
import classnames, { position } from 'classnames/tailwind'

const commentWithReplies = classnames(position('relative'))

export default function ({
  content,
  replier,
  repliedTo,
  timestamp,
  replies,
}: {
  content: string
  replier: string
  repliedTo: string
  timestamp: number
  replies: string[]
}) {
  return (
    <div className={commentWithReplies}>
      <Comment
        content={content}
        replier={replier}
        repliedTo={repliedTo}
        timestamp={timestamp}
      />

      {replies.map((reply) => (
        <Comment
          content={reply}
          replier={replier}
          repliedTo={repliedTo}
          timestamp={timestamp}
        />
      ))}
    </div>
  )
}
