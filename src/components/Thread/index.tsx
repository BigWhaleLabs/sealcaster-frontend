import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import GoBackButton from 'components/Thread/GoBackButton'
import LoadingPage from 'components/Thread/LoadingPage'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'

const SuspendedThread = () => {
  const { posts, idToPostTx } = useSnapshot(PostStore)
  const { id, post, timestamp, sender } = posts[0]

  return (
    <Post
      key={id}
      blockchainId={Number(id)}
      timestamp={Number(timestamp)}
      text={post}
      sender={sender}
      tx={idToPostTx[Number(id)]}
    />
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingPage />}>
      <div className={space('space-y-5')}>
        <GoBackButton />
        <SuspendedThread />
      </div>
    </Suspense>
  )
}
