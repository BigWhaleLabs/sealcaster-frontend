import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CustomizeCard from 'components/BlockchainList/CustomizeCard'
import InfiniteScroll from 'react-infinite-scroll-component'
import LoadingList from 'components/BlockchainList/LoadingList'
import NoPosts from 'components/BlockchainList/NoPosts'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'
import flashingPost from 'helpers/flashingPost'
import getMorePosts from 'helpers/getMorePosts'
import getPostStorage from 'helpers/getPostStorage'
import useHashParams from 'hooks/useHashParams'
import useScrollToAnchor from 'hooks/useScrollToAnchor'

const scrollContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

export function PostListSuspended() {
  const { posts, selectedToken, postsAmount, limit, idToPostTx } =
    useSnapshot(PostStore)
  const hashId = useHashParams()
  const [, setScrolledLimit] = useState(limit)
  const amountOfLoadedPosts = posts.length

  const postsLoaded = selectedToken
    ? posts.filter(
        ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
      )
    : posts

  if (hashId && !!amountOfLoadedPosts)
    useScrollToAnchor({ callback: flashingPost })

  return postsAmount > 0 ? (
    <InfiniteScroll
      next={async () => {
        const newPosts = await getMorePosts({
          contract: getPostStorage(),
        })
        PostStore.posts = Promise.resolve([...posts, ...newPosts])
        setScrolledLimit(PostStore.limit)
      }}
      className={scrollContainer}
      style={{ overflow: 'hidden' }}
      dataLength={amountOfLoadedPosts}
      hasMore={amountOfLoadedPosts < postsAmount}
      loader={<LoadingList text="Fetching more posts..." />}
      endMessage={postsAmount < 3 ? <CustomizeCard /> : undefined}
    >
      {postsLoaded.map((post, index) => (
        <>
          <Post
            key={post.id}
            blockchainId={Number(post.id)}
            timestamp={Number(post.timestamp)}
            text={post.post}
            sender={post.sender}
            tx={idToPostTx[Number(post.id)]}
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
