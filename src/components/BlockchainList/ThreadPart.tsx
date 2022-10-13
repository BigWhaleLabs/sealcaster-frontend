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
import usePost from 'hooks/usePost'
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
  owner,
}: {
  threadId: number
  replyingTo: string
  postId: number
  limitThread?: number
  threadMerkleRoot: string
  owner: boolean
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
          isThreadOwned={owner}
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
                  isThreadOwned={owner}
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
                isThreadOwned={owner}
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
  replyingTo,
  postId,
  limitThread,
}: {
  threadId: number
  replyingTo: string
  postId: number
  limitThread?: number
}) {
  const post = usePost(threadId + 1)
  const { cast } = useCast(post)

  if (!post || !cast || !cast?.merkleRoot) return null

  const account = useBadgeAccount()
  const owner = post.sender === account

  return (
    <ThreadPart
      replyingTo={replyingTo}
      threadId={threadId}
      postId={postId}
      limitThread={limitThread}
      owner={owner}
      threadMerkleRoot={cast.merkleRoot}
    />
  )
}
