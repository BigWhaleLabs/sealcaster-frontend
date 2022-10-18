import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
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
  position,
  space,
} from 'classnames/tailwind'
import useMerkleRoot from 'hooks/useMerkleRoot'
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
  const threadMerkleRoot = useMerkleRoot(id)

  if (!threadMerkleRoot || !blockchainPost) return null

  const { post, sender } = blockchainPost

  return (
    <div className={position('relative')}>
      <Card hoverEffect>
        <a className={space('space-y-4')} href={`/thread/${id}`}>
          <QuestionOfDayText>Question of the day:</QuestionOfDayText>
          <HeaderText size="medium">{post}</HeaderText>
          <span className={postInfo}>
            <StatusText>Posted by: </StatusText>
            <Sender sender={sender} />
          </span>
        </a>
        <StickLabel />
        <Replies
          threadId={id}
          replyToId={threadMerkleRoot}
          placeholder="Answer today’s question..."
          canReply
        />
      </Card>
    </div>
  )
}

function QuestionsOfDaySuspended() {
  const { questionOfTheDayIds } = useSnapshot(PostStore)

  if (!questionOfTheDayIds.length) return null

  const lastQuestionDay = Math.max(...questionOfTheDayIds)

  return <QuestionOfDaySuspended id={lastQuestionDay} />
}

export default function () {
  return (
    <Suspense fallback="">
      <QuestionsOfDaySuspended />
    </Suspense>
  )
}
