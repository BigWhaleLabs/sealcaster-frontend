import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import GoBackButton from 'components/Thread/GoBackButton'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'

const SuspendedThread = () => {
  const { posts, idToPostTx } = useSnapshot(PostStore)
  const post = posts[0]

  return (
    <Post
      key={post.id}
      blockchainId={Number(post.id)}
      timestamp={Number(post.timestamp)}
      text={post.post}
      sender={post.sender}
      tx={idToPostTx[Number(post.id)]}
    />
  )
}

export default function () {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className={space('space-y-5')}>
        <GoBackButton />
        <SuspendedThread />
      </div>
    </Suspense>
  )
}
