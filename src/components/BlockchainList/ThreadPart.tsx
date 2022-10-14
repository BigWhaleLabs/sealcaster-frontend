import { AccentText } from 'components/ui/Text'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import CommentBody from 'components/BlockchainList/CommentBody'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Replies from 'components/BlockchainList/Replies'
import classNamesToString from 'helpers/classNamesToString'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
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
  canReply,
}: {
  threadId: number
  replyingTo: string
  postId: number
  limitThread?: number
  threadMerkleRoot: string
  canReply?: boolean
}) {
  const replies = useReplies({
    threadId,
    threadMerkleRoot,
    replyToId: threadMerkleRoot,
  })

  const repliesLength = replies.length

  if (!canReply && repliesLength === 0) return null

  return (
    <>
      <div className={wrapper}>
        <Replies
          replyToId={threadMerkleRoot}
          threadId={threadId}
          placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
          canReply={canReply}
        />
        {replies.map(({ castId, postId }, index) =>
          limitThread ? (
            index < limitThread && (
              <CommentWithReplies
                castId={castId}
                postId={postId}
                threadId={threadId}
                threadMerkleRoot={threadMerkleRoot}
                canReply={canReply}
                hideReplies
              />
            )
          ) : (
            <CommentWithReplies
              castId={castId}
              postId={postId}
              threadId={threadId}
              threadMerkleRoot={threadMerkleRoot}
              canReply={canReply}
            />
          )
        )}
        {limitThread && repliesLength > 3 && (
          <a href={`/thread/${postId}`}>
            <BareCard smallPaddings>
              <AccentText color="text-accent" small>
                + {repliesLength - limitThread}{' '}
                {repliesLength - limitThread > 1 ? 'replies' : 'reply'}
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
  canReply,
}: {
  threadId: number
  postId: number
  limitThread?: number
  owner: string
  canReply?: boolean
}) {
  const { cast } = useCast(postId)

  if (!cast || !cast?.merkleRoot) return null

  return (
    <ThreadPart
      replyingTo={owner}
      threadId={threadId}
      postId={postId}
      limitThread={limitThread}
      canReply={canReply}
      threadMerkleRoot={cast.merkleRoot}
    />
  )
}
