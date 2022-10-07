import { AccentText } from 'components/ui/Text'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BareCard from 'components/BareCard'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import PostStore, { fetchThread } from 'stores/PostStore'
import Replies from 'components/BlockchainList/Replies'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)

type CommentNode = {
  id: number
  timestamp: number
  content: string
  replier: string
  repliedTo: string
  replies: CommentNode[]
}

function makeCommentNode(
  {
    id,
    timestamp,
    repliedTo,
    replier,
    content,
  }: {
    id: number
    timestamp: number
    content: string
    replier: string
    repliedTo: string
  },
  posts: PostStructOutput[]
): CommentNode {
  return {
    id,
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
  const { threads } = useSnapshot(PostStore)
  const thread = threads[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  const comments = buildCommentsTree(
    threadId,
    threadCreator,
    Array.from(thread)
  )

  const commentsLength = comments.length

  return (
    <div className={wrapper}>
      <Replies
        count={comments.length}
        placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
      />
      {comments.map(
        ({ timestamp, content, replier, repliedTo, replies }, index) =>
          limitThread ? (
            index < limitThread && (
              <CommentWithReplies
                timestamp={timestamp}
                content={content}
                replier={replier}
                repliedTo={repliedTo}
              />
            )
          ) : (
            <CommentWithReplies
              timestamp={timestamp}
              content={content}
              replier={replier}
              repliedTo={repliedTo}
              replies={replies}
            />
          )
      )}
      {limitThread && (
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
