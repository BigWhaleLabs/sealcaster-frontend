import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Card from 'components/ui/Card'
import Delimiter from 'components/ui/Delimiter'
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

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline', 'xs:items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

export default function () {
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
        {/* TODO: add real count */}
        <Replies
          count={0}
          placeholder="Answer today’s question..."
          withHowItWorks
        />
      </Card>
    </div>
  )
}
