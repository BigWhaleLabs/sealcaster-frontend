import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useSnapshot } from 'valtio'
import GoBackButton from 'components/Thread/GoBackButton'
import LoadingPage from 'components/Thread/LoadingPage'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import ThreadNotFound from 'components/Thread/ThreadNotFound'
import useBadgeAccount from 'hooks/useBadgeAccount'
import useHashParams from 'hooks/useHashParams'
import usePost from 'hooks/usePost'
import useScrollToTop from 'hooks/useScrollToTop'

const SuspendedThread = () => {
  const hashId = useHashParams()
  if (!hashId) return <ThreadNotFound />
  const { questionOfTheDayIds } = useSnapshot(PostStore)
  const account = useBadgeAccount()
  const blockchainId = Number(hashId)
  const { idToPostTx } = useSnapshot(PostStore)
  const postData = usePost(blockchainId)
  useScrollToTop()

  if (!postData) return <ThreadNotFound />

  const { id, post, timestamp, sender } = postData
  const isQuestionOfTheDay = questionOfTheDayIds.includes(id.toNumber())

  return (
    <div className={space('space-y-5')}>
      <GoBackButton />
      <Post
        key={id}
        isQuestionOfTheDay={isQuestionOfTheDay}
        canReply={account === sender || isQuestionOfTheDay}
        blockchainId={Number(id)}
        timestamp={Number(timestamp)}
        text={post}
        sender={sender}
        tx={idToPostTx[Number(id) - 1]}
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
