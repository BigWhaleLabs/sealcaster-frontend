import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CustomizeCard from 'components/BlockchainList/CustomizeCard'
import LoadingList from 'components/BlockchainList/LoadingList'
import NoPosts from 'components/BlockchainList/NoPosts'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import flashingPost from 'helpers/flashingPost'
import useHashParams from 'hooks/useHashParams'
import useScrollToAnchor from 'hooks/useScrollToAnchor'
import useThread from 'hooks/useThread'

export function PostListSuspended() {
  const data = useThread(0)
  const { selectedToken, idToPostTx } = useSnapshot(PostStore)
  const hashId = useHashParams()

  const amountOfLoadedPosts = data ? data.thread.length : 0

  if (hashId && !!amountOfLoadedPosts)
    useScrollToAnchor({ callback: flashingPost })

  if (!data) return <></>

  const postsLoaded = selectedToken
    ? data.thread.filter(
        ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
      )
    : data.thread

  return postsLoaded.length > 0 ? (
    <>
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
          />
          {index === 2 && <CustomizeCard />}
        </>
      ))}
    </>
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
