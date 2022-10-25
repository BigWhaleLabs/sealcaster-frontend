import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CustomizeCard from 'components/BlockchainList/CustomizeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingList from 'components/BlockchainList/LoadingList'
import NoPosts from 'components/BlockchainList/NoPosts'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import classnames, {
  display,
  flexDirection,
  gap,
  overflow,
} from 'classnames/tailwind'
import flashingThread from 'helpers/flashingPost'
import useBadgeAccount from 'hooks/useBadgeAccount'
import useHashParams from 'hooks/useHashParams'
import usePaginated from 'hooks/usePaginated'
import useScrollToAnchor from 'hooks/useScrollToAnchor'
import useThread from 'hooks/useThread'

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  overflow('overflow-hidden')
)

export function PostListSuspended() {
  const account = useBadgeAccount()
  const { idToPostTx, limit, questionOfTheDayIds } = useSnapshot(PostStore)
  const thread = useThread(0)
  const hashId = useHashParams()

  const posts = thread ? thread : []
  const postsLength = posts.length
  const { paginated, skip, setSkip } = usePaginated(posts, limit)

  if (!thread) return <LoadingList text="Fetching posts..." />
  if (hashId) useScrollToAnchor({ callback: flashingThread })
  const paginatedLength = paginated.length

  return paginatedLength > 0 ? (
    <InfiniteScroll
      next={() => setSkip(skip + limit)}
      className={scrollContainer}
      dataLength={paginatedLength}
      hasMore={paginatedLength < postsLength}
      loader={<LoadingList text="Fetching more posts..." />}
      endMessage={postsLength < 3 ? <CustomizeCard /> : undefined}
    >
      {paginated.map(({ id, timestamp, post, sender }, index) => (
        <>
          <Post
            isQuestionOfTheDay={questionOfTheDayIds.includes(id.toNumber())}
            canReply={
              questionOfTheDayIds.includes(id.toNumber()) || sender === account
            }
            key={id}
            blockchainId={Number(id)}
            timestamp={Number(timestamp)}
            text={post}
            sender={sender}
            tx={idToPostTx[Number(id) - 1]}
            limitThread={2}
            clickablePost
          />

          {index === 2 && <CustomizeCard />}
        </>
      ))}
    </InfiniteScroll>
  ) : (
    <NoPosts />
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingList text="Fetching posts..." />}>
      <PostListSuspended />
    </Suspense>
  )
}
