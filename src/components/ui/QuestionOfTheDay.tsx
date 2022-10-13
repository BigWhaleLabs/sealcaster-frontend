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
  space,
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

function QuestionOfDaySuspended({ id }: { id: number }) {
  const blockchainPost = usePost(id)
  const { cast } = useCast(id)

  if (!blockchainPost) return null

  const { post, sender } = blockchainPost

  return (
    <div className={classnames(margin('mt-24'), position('relative'))}>
      <Card hoverEffect>
        <a className={space('space-y-4')} href={`/thread/${id}`}>
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
        </a>
        <Replies
          threadId={id}
          replyToId={cast?.merkleRoot}
          placeholder="Answer today’s question..."
          canReply
        />
      </Card>
    </div>
  )
}

function QuestionsOfDaySuspended() {
  const { questionOfTheDayIds } = useSnapshot(PostStore)
  const questionDay =
    questionOfTheDayIds.length > 0 ? Math.max(...questionOfTheDayIds) : null

  if (!questionDay) return null

  return <QuestionOfDaySuspended id={questionDay} />
}

export default function () {
  return (
    <Suspense fallback="">
      <QuestionsOfDaySuspended />
    </Suspense>
  )
}
