import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import Card from 'components/ui/Card'
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
import useCast from 'hooks/useCast'
import usePost from 'hooks/usePost'

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline', 'xs:items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

function QuestionOfDaySuspended() {
  const { questionDay } = useSnapshot(PostStore)
  const blockchainPost = usePost(questionDay)
  const { cast } = useCast(questionDay)

  if (!blockchainPost) return null

  const { post, sender } = blockchainPost

  return (
    <div className={classnames(margin('mt-24'), position('relative'))}>
      <a href={`/thread/${questionDay}`}>
        <Card hoverEffect>
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

          <Replies
            threadId={questionDay}
            replyToId={cast?.merkleRoot}
            placeholder="Answer today’s question..."
            isThreadOwned={true}
          />
        </Card>
      </a>
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
