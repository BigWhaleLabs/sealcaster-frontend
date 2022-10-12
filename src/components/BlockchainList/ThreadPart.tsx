import { AccentText } from 'components/ui/Text'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Delimiter from 'components/ui/Delimiter'
import Replies from 'components/BlockchainList/Replies'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import useBadgeAccount from 'hooks/useBadgeAccount'
import useComments from 'hooks/useComments'

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
  const account = useBadgeAccount()
  const threadInfo = useComments(threadId)

  if (!threadInfo) return null

  const isThreadOwned = threadInfo.sender === account
  const commentsLength = threadInfo.count

  if (commentsLength === 0 && !threadInfo.cast?.merkleRoot) return null

  return (
    <>
      <Delimiter color="bg-half-grey" horizontal />
      <div className={wrapper}>
        <Replies
          replyToId={threadInfo.cast?.merkleRoot}
          threadId={threadId}
          count={commentsLength}
          placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
          isThreadOwned={isThreadOwned}
        />
        {threadInfo.comments.map(
          (
            { timestamp, content, replier, repliedTo, replies, id, replyToId },
            index
          ) =>
            limitThread ? (
              index < limitThread && (
                <CommentWithReplies
                  threadId={threadId}
                  id={id}
                  timestamp={timestamp}
                  content={content}
                  replier={replier}
                  repliedTo={repliedTo}
                  replyToId={replyToId}
                  isThreadOwned={isThreadOwned}
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
                replyToId={replyToId}
                isThreadOwned={isThreadOwned}
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
    </>
  )
}
