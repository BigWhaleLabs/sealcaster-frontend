import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import PostStore, { fetchThread } from 'stores/PostStore'
import Replies from 'components/BlockchainList/Replies'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)

export default function ({
  threadId,
  replyingTo,
  limitThread,
}: {
  threadId: number
  replyingTo: string
  limitThread?: number
}) {
  const { threads } = useSnapshot(PostStore)
  const thread = threads[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  const comments = Array.from(thread).map(
    ({ timestamp, sender: replier, post: content, replyToId }) => ({
      replier,
      content,
      timestamp: +timestamp,
      repliedTo: replyToId,
      replies: [],
    })
  )

  // TODO: change repliedTo="author" with post address
  return (
    <div className={wrapper}>
      <Replies count={comments.length} replyingTo={replyingTo} />
      {comments.map(
        ({ timestamp, content, replier, repliedTo, replies }, index) =>
          limitThread ? (
            index < limitThread && (
              <CommentWithReplies
                timestamp={timestamp}
                content={content}
                replier={replier}
                repliedTo="author"
              />
            )
          ) : (
            <CommentWithReplies
              timestamp={timestamp}
              content={content}
              replier={replier}
              repliedTo="author"
              replies={replies}
            />
          )
      )}
    </div>
  )
}
