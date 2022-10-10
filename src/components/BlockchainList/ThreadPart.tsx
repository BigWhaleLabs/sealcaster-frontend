import { AccentText } from 'components/ui/Text'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import Comment from 'models/Comment'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Replies from 'components/BlockchainList/Replies'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import useThread from 'hooks/useThread'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)

function makeCommentNode(
  {
    id,
    timestamp,
    repliedTo,
    replier,
    content,
    threadId,
  }: {
    threadId: number
    id: number
    timestamp: number
    content: string
    replier: string
    repliedTo: string
  },
  posts: PostStructOutput[]
): Comment {
  return {
    id,
    threadId,
    timestamp,
    replier,
    content,
    repliedTo,
    replies: posts
      .filter((post) => post.replyToId && +post.replyToId === id)
      .map(({ id, timestamp, sender: replier, post: content }) =>
        makeCommentNode(
          {
            id: +id,
            threadId,
            replier,
            content,
            repliedTo,
            timestamp: +timestamp,
          },
          posts
        )
      ),
  }
}

function buildCommentsTree(
  threadId: number,
  threadCreator: string,
  posts: PostStructOutput[]
) {
  return posts
    .filter((post) => post.replyToId && +post.replyToId === threadId)
    .map(({ id, timestamp, sender: replier, post: content }) =>
      makeCommentNode(
        {
          id: +id,
          threadId,
          replier,
          content,
          timestamp: +timestamp,
          repliedTo: threadCreator,
        },
        posts
      )
    )
}

export default function ({
  threadCreator,
  threadId,
  replyingTo,
  postId,
  limitThread,
}: {
  threadCreator: string
  threadId: number
  replyingTo: string
  postId: number
  limitThread?: number
}) {
  const threadInfo = useThread(threadId)

  if (!threadInfo) return null

  const commentsTree = buildCommentsTree(
    threadId,
    threadCreator,
    threadInfo.thread
  )

  const commentsLength = threadInfo.thread.length

  return (
    <div className={wrapper}>
      <Replies
        replyToId={postId}
        threadId={threadId}
        count={commentsLength}
        placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
      />
      {commentsTree.map(
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
