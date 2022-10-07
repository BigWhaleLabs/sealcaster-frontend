import {
  AccentText,
  HeaderText,
  QuestionOfDayText,
  StatusText,
} from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import CastBlock from 'components/Cast/CastBlock'
import Delimiter from 'components/ui/Delimiter'
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

export default function () {
  const [inputOpen, setInputOpen] = useState(false)

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
        <HeaderText size="medium">
          Hey VCs, what should startup do to capture your attention?
        </HeaderText>
        <span className={postInfo}>
          {/* // TODO: add real logic here with urls */}
          <StatusText>Posted by: </StatusText>
          <Sender sender="Sealcaster" />
          <div className={displayFrom('xs')}>
            <Delimiter color="bg-formal-accent" />
          </div>
          <Sender sender="Farcaster" />
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
            {/* // TODO: add real logic with threads number here */}
            <AccentText color="text-primary-semi-dimmed" extraSmall>
              (0)
            </AccentText>
          </div>
        </Button>
        {inputOpen && <CastBlock placeHolder="Answer today’s question..." />}
      </Card>
    </div>
  )
}
