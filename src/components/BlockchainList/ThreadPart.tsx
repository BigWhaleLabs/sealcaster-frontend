import { AccentText } from 'components/ui/Text'
import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import BareCard from 'components/BareCard'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import PostStore, { fetchThread } from 'stores/PostStore'
import Replies from 'components/BlockchainList/Replies'
import truncateMiddleIfNeeded from 'helpers/network/truncateMiddleIfNeeded'
import walletStore from 'stores/WalletStore'

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
  isThreadOwned?: boolean
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
  const { account } = useSnapshot(walletStore)
  const thread = threads[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  const isThreadOwned = threadCreator === account

  const comments = buildCommentsTree(
    threadId,
    threadCreator,
    Array.from(thread)
  )

  const commentsLength = comments.length

  return (
    <div className={wrapper}>
      <Replies
        replyToId={postId}
        threadId={threadId}
        count={comments.length}
        placeholder={`Reply to ${truncateMiddleIfNeeded(replyingTo, 12)}`}
        isThreadOwned={isThreadOwned}
      />
      {comments.map(
        ({ timestamp, content, replier, repliedTo, replies, id }, index) =>
          limitThread ? (
            index < limitThread && (
              <CommentWithReplies
                threadId={threadId}
                id={id}
                replyToId={id}
                timestamp={timestamp}
                content={content}
                replier={replier}
                repliedTo={repliedTo}
                isThreadOwned={isThreadOwned}
              />
            )
          ) : (
            <CommentWithReplies
              threadId={threadId}
              id={id}
              replyToId={id}
              timestamp={timestamp}
              content={content}
              replier={replier}
              repliedTo={repliedTo}
              replies={replies}
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
  )
}
