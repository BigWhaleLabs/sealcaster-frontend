import { AccentText } from 'components/ui/Text'
import { Link } from 'wouter'
import { LoadingReplies } from 'components/Thread/LoadingPost'
import { Suspense, memo } from 'preact/compat'
import {
  classnames,
  cursor,
  display,
  flexDirection,
  gap,
} from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BareCard from 'components/BareCard'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Replies from 'components/BlockchainList/Replies'
import classNamesToString from 'helpers/classNamesToString'
import farcasterStore from 'stores/FarcasterStore'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import useMerkleRoot from 'hooks/useMerkleRoot'
import useReplies from 'hooks/useReplies'

const wrapper = classNamesToString(
  classnames(display('flex'), flexDirection('flex-col'), gap('gap-y-3')),
  'empty:hidden'
)

interface ThreadProps {
  threadId: number
  postId: number
  limitThread?: number
  owner: string
  canReply?: boolean
}

function ThreadPartSuspended({
  canReply,
  limitThread,
  owner,
  postId,
  threadId,
}: ThreadProps) {
  const threadHash = useMerkleRoot(postId)
  if (!threadHash) return null

  const replies = useReplies({
    replyToId: threadHash,
    threadId,
  })
  const repliesLength = replies.length

  if (!canReply && repliesLength === 0) return null

  return (
    <div className={wrapper}>
      <Replies
        canReply={canReply}
        placeholder={`Reply to ${truncateMiddleIfNeeded(owner, 12)}`}
        replyToId={threadHash}
        threadId={threadId}
      />
      {replies.map(({ castId, postId }, index) =>
        limitThread ? (
          index < limitThread && (
            <CommentWithReplies
              hideReplies
              canReply={canReply}
              castId={castId}
              postId={postId}
              threadId={threadId}
            />
          )
        ) : (
          <CommentWithReplies
            canReply={canReply}
            castId={castId}
            postId={postId}
            threadId={threadId}
          />
        )
      )}
      {limitThread && repliesLength > 3 && (
        <Link to={`#/thread/${postId}`}>
          <div className={cursor('cursor-pointer')}>
            <BareCard smallPaddings>
              <AccentText small color="text-accent">
                + {repliesLength - limitThread}{' '}
                {repliesLength - limitThread > 1 ? 'replies' : 'reply'}
              </AccentText>
            </BareCard>
          </div>
        </Link>
      )}
    </div>
  )
}

export default memo<ThreadProps>(
  ({ canReply, limitThread, owner, postId, threadId }) => {
    const { requested } = useSnapshot(farcasterStore)
    const props = { canReply, limitThread, owner, postId, threadId }

    return (
      <Suspense fallback={<LoadingReplies />}>
        {requested[postId] ? (
          <LoadingReplies />
        ) : (
          <ThreadPartSuspended {...props} />
        )}
      </Suspense>
    )
  }
)
