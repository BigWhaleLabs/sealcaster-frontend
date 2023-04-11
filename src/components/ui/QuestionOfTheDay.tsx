import { Link } from 'wouter'
import {
  QuestionOfDayPostText,
  QuestionOfDayText,
  StatusText,
} from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import Card from 'components/ui/Card'
import LoadingPost from 'components/Thread/LoadingPost'
import QuestionOfDayStore from 'stores/QuestionOfDayStore'
import Replies from 'components/BlockchainList/Replies'
import Sender from 'components/BlockchainList/Sender'
import StickLabel from 'components/QuestionOfTheDay/StickLabel'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  position,
  space,
} from 'classnames/tailwind'

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline', 'xs:items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

function QuestionsOfDaySuspended() {
  const { allQodPostIds, lastQoDPost } = useSnapshot(QuestionOfDayStore)
  const lastQoDId = Math.max(...allQodPostIds)
  if (!lastQoDPost || !lastQoDId) return null
  const { hash, qod } = lastQoDPost

  return (
    <div className={position('relative')}>
      <Card hoverEffect>
        <Link className={space('space-y-4')} href={`#/thread/${lastQoDId}`}>
          <QuestionOfDayText>Question of the day:</QuestionOfDayText>
          <QuestionOfDayPostText>{qod.post}</QuestionOfDayPostText>
          <span className={postInfo}>
            <StatusText>Posted by: </StatusText>
            <Sender sender={qod.sender} />
          </span>
        </Link>
        <StickLabel />
        <Replies
          canReply
          placeholder="Answer today’s question..."
          replyToId={hash}
          threadId={lastQoDId}
        />
      </Card>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={<LoadingPost isQoD />}>
      <QuestionsOfDaySuspended />
    </Suspense>
  )
}
