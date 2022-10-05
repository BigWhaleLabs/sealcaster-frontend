import {
  AccentText,
  HeaderText,
  QuestionOfDayText,
  StatusText,
} from 'components/ui/Text'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import CastBlock from 'components/Cast/CastBlock'
import Delimiter from 'components/ui/Delimiter'
import Sender from 'components/BlockchainList/Sender'
import TextareaInfo from 'components/Cast/TextareaInfo'
import Thread from 'icons/Thread'
import VertialDelimiter from 'components/ui/VertialDelimiter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  textColor,
} from 'classnames/tailwind'

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

export default function () {
  const [opened, setOpened] = useState(false)

  return (
    <Card>
      <QuestionOfDayText>Question of day</QuestionOfDayText>
      <HeaderText size="medium">
        Hey VCs, what should startup do to capture your attention?
      </HeaderText>
      <span className={postInfo}>
        <StatusText>Posted by: </StatusText>
        <Sender sender="Sealcaster" />
        <Delimiter />
        <Sender sender="Farcaster" />
      </span>
      <VertialDelimiter />
      <Button
        type="tertiary"
        onClick={() => {
          setOpened(!opened)
        }}
      >
        <AccentText small color="text-formal-accent">
          <div
            className={classnames(
              display('flex'),
              flexDirection('flex-row'),
              gap('gap-x-1'),
              alignItems('items-center')
            )}
          >
            <Thread />
            <span
              className={classnames(
                textColor(opened ? 'text-accent' : 'hover:text-accent')
              )}
            >
              Answer anonymously
            </span>
            <AccentText color="text-primary-semi-dimmed">(0)</AccentText>
          </div>
        </AccentText>
      </Button>
      {opened && <CastBlock placeHolder="Answer today’s question..." />}
    </Card>
  )
}
