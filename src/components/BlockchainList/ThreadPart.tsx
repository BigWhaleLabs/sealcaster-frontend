import { AccentText } from 'components/ui/Text'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Replies from 'components/BlockchainList/Replies'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import useThread from 'hooks/useThread'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)

export default function ({
  threadId,
  replyingTo,
  postId,
  limitThread,
}: {
  threadId: number
  replyingTo: string
  postId: number
  limitThread?: number
}) {
  const threadInfo = useThread(threadId)

  if (!threadInfo) return null

  const commentsLength = threadInfo.count

  return (
    <div className={wrapper}>
      <Replies
        replyToId={postId}
        threadId={threadId}
        count={commentsLength}
        placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
      />
      {threadInfo.comments.map(
        ({ timestamp, content, replier, repliedTo, replies, id }, index) =>
          limitThread ? (
            index < limitThread && (
              <CommentWithReplies
                threadId={threadId}
                id={id}
                timestamp={timestamp}
                content={content}
                replier={replier}
                repliedTo={repliedTo}
              />
            )
          ) : (
            <CommentWithReplies
              threadId={threadId}
              id={id}
              timestamp={timestamp}
              content={content}
              replier={replier}
              repliedTo={repliedTo}
              replies={replies}
            />
          )
      )}
      {limitThread && commentsLength > 3 && (
        <a href={`/thread/${postId}`}>
          <BareCard smallPaddings>
            <AccentText color="text-accent" small>
              + {commentsLength - limitThread}{' '}
              {commentsLength - limitThread > 1 ? 'replies' : 'reply'}
            </AccentText>
          </BareCard>
        </a>
      )}
    </div>
  )
}
