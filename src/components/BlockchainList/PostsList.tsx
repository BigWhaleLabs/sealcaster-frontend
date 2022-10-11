import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import CustomizeCard from 'components/BlockchainList/CustomizeCard'
import LoadingList from 'components/BlockchainList/LoadingList'
import NoPosts from 'components/BlockchainList/NoPosts'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import flashingThread from 'helpers/flashingPost'
import useHashParams from 'hooks/useHashParams'
import useScrollToAnchor from 'hooks/useScrollToAnchor'
import useThread from 'hooks/useThread'

export function PostListSuspended() {
  const { selectedToken, idToPostTx } = useSnapshot(PostStore)
  const threadInfo = useThread(0)
  const hashId = useHashParams()

  const posts = threadInfo ? threadInfo.thread : []

  const filteredPosts = selectedToken
    ? posts.filter(
        ({ derivativeAddress }) => derivativeAddress === PostStore.selectedToken
      )
    : posts

  if (hashId && filteredPosts.length > 0)
    useScrollToAnchor({ callback: flashingThread })

  if (filteredPosts.length === 0) return <NoPosts />

  return (
    <>
      {filteredPosts.map((post, index) => (
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
    </>
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingList text="Fetching posts..." />}>
      <PostListSuspended />
    </Suspense>
  )
}
