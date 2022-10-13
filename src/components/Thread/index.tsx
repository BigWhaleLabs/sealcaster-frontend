import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import GoBackButton from 'components/Thread/GoBackButton'
import LoadingPage from 'components/Thread/LoadingPage'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import ThreadNotFound from 'components/Thread/ThreadNotFound'
import usePost from 'hooks/usePost'

const SuspendedThread = () => {
  const [location] = useLocation()
  const blockchainId = Number(location.split('/')[2])
  const { idToPostTx } = useSnapshot(PostStore)
  const postData = usePost(blockchainId)

  if (!postData) return <ThreadNotFound />

  const { id, post, timestamp, sender } = postData

  return (
    <div className={space('space-y-5')}>
      <GoBackButton />
      <Post
        key={id}
        blockchainId={Number(id)}
        timestamp={Number(timestamp)}
        text={post}
        sender={sender}
        tx={idToPostTx[Number(id)]}
      />
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingPage />}>
      <SuspendedThread />
    </Suspense>
  )
}
