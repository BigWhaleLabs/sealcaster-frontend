import { AccentText } from 'components/ui/Text'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import CommentBody from 'components/BlockchainList/CommentBody'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Replies from 'components/BlockchainList/Replies'
import classNamesToString from 'helpers/classNamesToString'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import useBadgeAccount from 'hooks/useBadgeAccount'
import useCast from 'hooks/useCast'
import useReplies from 'hooks/useReplies'

const wrapper = classNamesToString(
  classnames(display('flex'), flexDirection('flex-col'), gap('gap-y-3')),
  'empty:hidden'
)

function ThreadPart({
  threadId,
  replyingTo,
  postId,
  limitThread,
  threadMerkleRoot,
  isOwner,
}: {
  threadId: number
  replyingTo: string
  postId: number
  limitThread?: number
  threadMerkleRoot: string
  isOwner: boolean
}) {
  const comments = useReplies({
    threadId,
    threadMerkleRoot,
    replyToId: threadMerkleRoot,
  })

  const commentsLength = comments.length
  if (commentsLength === 0) return null

  return (
    <>
      <div className={wrapper}>
        <Replies
          replyToId={threadMerkleRoot}
          threadId={threadId}
          placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
          isThreadOwned={isOwner}
        />
        {comments.map(
          (
            { timestamp, content, replier, repliedTo, replies, id, replyToId },
            index
          ) =>
            limitThread ? (
              index < limitThread && (
                <CommentBody
                  threadId={threadId}
                  timestamp={timestamp}
                  content={content}
                  replier={replier}
                  replyToId={replyToId}
                  isThreadOwned={isOwner}
                />
              )
            ) : (
              <CommentWithReplies
                threadMerkleRoot={threadMerkleRoot}
                threadId={threadId}
                id={id}
                timestamp={timestamp}
                content={content}
                replier={replier}
                repliedTo={repliedTo}
                replies={replies}
                replyToId={replyToId}
                isThreadOwned={isOwner}
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

export default function ({
  threadId,
  postId,
  limitThread,
  owner,
}: {
  threadId: number
  postId: number
  limitThread?: number
  owner: string
}) {
  const { cast } = useCast(postId + 1)

  if (!cast || !cast?.merkleRoot) return null

  const account = useBadgeAccount()
  const isOwner = owner === account

  return (
    <ThreadPart
      replyingTo={owner}
      threadId={threadId}
      postId={postId}
      limitThread={limitThread}
      isOwner={isOwner}
      threadMerkleRoot={cast.merkleRoot}
    />
  )
}
