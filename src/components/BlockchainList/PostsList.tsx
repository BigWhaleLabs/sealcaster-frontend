import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { Suspense, useState } from 'preact/compat'
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
  const { selectedToken, idToPostTx, limit } = useSnapshot(PostStore)
  const [paginatedPosts, setPaginatedPosts] = useState<PostStructOutput[]>([])
  const [amountOfSeenPosts, setAmountOfSeenPosts] = useState(0)
  const thread = useThread(0)
  const hashId = useHashParams()

  const posts = thread ? thread : []

  const filteredPosts = selectedToken
    ? posts.filter(
        ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
      )
    : posts

  const { paginated, skip, setSkip } = usePaginated(filteredPosts, limit)

  const filteredPostsLength = filteredPosts.length

  if (filteredPostsLength === 0) return <NoPosts />
  if (hashId) useScrollToAnchor({ callback: flashingThread })

  return (
    <InfiniteScroll
      next={() => setSkip(skip + limit)}
      className={scrollContainer}
      dataLength={filteredPostsLength}
      hasMore={skip < filteredPostsLength}
      loader={<LoadingList text="Fetching more posts..." />}
      endMessage={filteredPostsLength < 3 ? <CustomizeCard /> : undefined}
    >
      {paginated.map(({ id, timestamp, post, sender }, index) => (
        <>
          <Post
            key={id}
            blockchainId={Number(id)}
            timestamp={Number(timestamp)}
            text={post}
            sender={sender}
            tx={idToPostTx[Number(id)]}
            limitThread={2}
            clickablePost
          />
          {index === 2 && <CustomizeCard />}
        </>
      ))}
    </InfiniteScroll>
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingList text="Fetching posts..." />}>
      <PostListSuspended />
    </Suspense>
  )
}
