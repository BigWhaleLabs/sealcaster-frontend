import { Suspense } from 'preact/compat'
import { space } from 'classnames/tailwind'
import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import GoBackButton from 'components/Thread/GoBackButton'
import LoadingPage from 'components/Thread/LoadingPage'
import Post from 'components/BlockchainList/Post'
import PostStore from 'stores/PostStore'
import QuestionOfDayStore from 'stores/QuestionOfDayStore'
import ThreadNotFound from 'components/Thread/ThreadNotFound'
import useBadgeAccount from 'hooks/useBadgeAccount'
import usePost from 'hooks/usePost'
import useScrollToTop from 'hooks/useScrollToTop'

const SuspendedThread = () => {
  const [location] = useLocation()
  const { allQodPostIds } = useSnapshot(QuestionOfDayStore)
  const account = useBadgeAccount()
  const blockchainId = Number(location.split('/')[2])
  const { idToPostTx } = useSnapshot(PostStore)
  const postData = usePost(blockchainId)
  useScrollToTop()

  if (!postData) return <ThreadNotFound />

  const { id, post, timestamp, sender } = postData
  const isQuestionOfTheDay = allQodPostIds.includes(id.toNumber())

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
