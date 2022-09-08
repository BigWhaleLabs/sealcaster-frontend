import { BodyText, LoadingText } from 'components/Text'
import { Suspense, useState } from 'preact/compat'
import { useSnapshot } from 'valtio'
import InfiniteScroll from 'react-infinite-scroll-component'
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
  const { posts, selectedToken, postsAmount, limit } = useSnapshot(PostStore)
  const hashId = useHashParams()
  const [scrolledLimit, setScrolledLimit] = useState(limit)
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
          limitAmount: scrolledLimit,
          loadedPostAmount: amountOfLoadedPosts,
        })
        PostStore.posts = Promise.resolve([...posts, ...newPosts])
        setScrolledLimit(PostStore.limit)
      }}
      className={scrollContainer}
      style={{ overflow: 'hidden' }}
      dataLength={amountOfLoadedPosts}
      hasMore={amountOfLoadedPosts < postsAmount}
      loader={<LoadingText>Fetching more posts...</LoadingText>}
    >
      {postsLoaded.map((post) => (
        <Post
          key={post.id}
          blockchainId={Number(post.id)}
          timestamp={Number(post.timestamp)}
          text={post.post}
          sender={post.sender}
          derivativeAddress={post.derivativeAddress}
        />
      ))}
    </InfiniteScroll>
  ) : (
    <NoPosts />
  )
}

export default function () {
  return (
    <Suspense fallback={<BodyText>Fetching posts</BodyText>}>
      <PostListSuspended />
    </Suspense>
  )
}
