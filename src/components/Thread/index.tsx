import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import GoBackButton from 'components/Thread/GoBackButton'
import LoadingPage from 'components/Thread/LoadingPage'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'

const SuspendedThread = () => {
  const [location] = useLocation()
  const blockchainId = location.split('/')[2]
  const { posts, idToPostTx } = useSnapshot(PostStore)
  const postData = posts.find(
    ({ derivativeAddress }) => derivativeAddress === blockchainId
  )

  if (!postData) return null

  const { id, post, timestamp, sender } = postData

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
