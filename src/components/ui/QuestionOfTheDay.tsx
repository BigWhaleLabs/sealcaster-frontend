import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import Card from 'components/ui/Card'
import Delimiter from 'components/ui/Delimiter'
import PostStore from 'stores/PostStore'
import Replies from 'components/BlockchainList/Replies'
import Sender from 'components/BlockchainList/Sender'
import StickLabel from 'components/QuestionOfTheDay/StickLabel'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  margin,
  position,
} from 'classnames/tailwind'
import useThread from 'hooks/useThread'

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline', 'xs:items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

function QuestionOfDaySuspended() {
  const { questionDay } = useSnapshot(PostStore)
  const data = useThread(questionDay)

  if (!data) return null

  const { post, sender, count } = data

  return (
    <div className={classnames(margin('mt-24'), position('relative'))}>
      <Card>
        <div className={displayFrom('xs')}>
          <div className={displayTo('lg')}>
            <StickLabel mobile />
          </div>
          <div className={displayFrom('lg')}>
            <StickLabel />
          </div>
        </div>
        <QuestionOfDayText>Question of the day:</QuestionOfDayText>
        <HeaderText size="medium">{post}</HeaderText>
        <span className={postInfo}>
          <StatusText>Posted by: </StatusText>
          <Sender sender={sender} />
        </span>
        <Delimiter horizontal color="bg-divider" />
        <Replies
          threadId={questionDay}
          replyToId={questionDay}
          count={count}
          placeholder="Answer today’s question..."
        />
      </Card>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback="">
      <QuestionOfDaySuspended />
    </Suspense>
  )
}
