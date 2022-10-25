import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import { Link } from 'wouter'
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

function QuestionsOfDaySuspended() {
  const { questionOfTheDayIds } = useSnapshot(PostStore)

  if (!questionOfTheDayIds.length) return null
  const lastQuestionDay = Math.max(...questionOfTheDayIds)
  const blockchainPost = usePost(lastQuestionDay)
  const threadMerkleRoot = useMerkleRoot(lastQuestionDay)

  if (!threadMerkleRoot || !blockchainPost) return null

  const { post, sender } = blockchainPost

  return (
    <div className={position('relative')}>
      <Card hoverEffect>
        <Link className={space('space-y-4')} to={`/thread/${lastQuestionDay}`}>
          <QuestionOfDayText>Question of the day:</QuestionOfDayText>
          <HeaderText size="medium">{post}</HeaderText>
          <span className={postInfo}>
            <StatusText>Posted by: </StatusText>
            <Sender sender={sender} />
          </span>
        </Link>
        <StickLabel />
        <Replies
          threadId={lastQuestionDay}
          replyToId={threadMerkleRoot}
          placeholder="Answer today’s question..."
          canReply
        />
      </Card>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback={null}>
      <QuestionsOfDaySuspended />
    </Suspense>
  )
}
