import {
  AccentText,
  HeaderText,
  QuestionOfDayText,
  StatusText,
} from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import CastBlock from 'components/Cast/CastBlock'
import Delimiter from 'components/ui/Delimiter'
import PostStore, { fetchThread } from 'stores/PostStore'
import Replies from 'components/BlockchainList/Replies'
import ReplyIcon from 'icons/ReplyIcon'
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
  textColor,
} from 'classnames/tailwind'

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline', 'xs:items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

const answerButtonWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-1'),
  alignItems('items-center')
)

function QuestionOfDaySuspended() {
  const [inputOpen, setInputOpen] = useState(false)
  const { questionDay } = useSnapshot(PostStore)

  const { threads } = useSnapshot(PostStore)
  const thread = threads[questionDay.id.toNumber()]

  if (!thread) {
    fetchThread(questionDay.id.toNumber())
    return null
  }

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
        <HeaderText size="medium">{questionDay.post}</HeaderText>
        <span className={postInfo}>
          <StatusText>Posted by: </StatusText>
          <Sender sender={questionDay.sender} />
        </span>
        <Delimiter horizontal color="bg-divider" />
        <Button
          type="tertiary"
          onClick={() => {
            setInputOpen(!inputOpen)
          }}
        >
          <div className={answerButtonWrapper}>
            <ReplyIcon />
            <AccentText small color="text-formal-accent">
              <span
                className={textColor(
                  inputOpen ? 'text-accent' : 'hover:text-accent'
                )}
              >
                Answer anonymously
              </span>
            </AccentText>

            <Replies
              count={Array.from(thread).length}
              placeholder="Answer today’s question..."
              withHowItWorks
            />
          </div>
        </Button>
        {inputOpen && (
          <CastBlock
            threadId={+questionDay.id}
            replyToId={+questionDay.id}
            placeHolder="Answer today’s question..."
          />
        )}
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
