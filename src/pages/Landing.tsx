import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import BlockchainList from 'components/BlockchainList'
import BurnerBlock from 'components/Landing/BurnerBlock'
import Card from 'components/ui/Card'
import Delimiter from 'components/ui/Delimiter'
import HowItWorks from 'components/HowItWorks'
import Sender from 'components/BlockchainList/Sender'
import VertialDelimiter from 'components/ui/VertialDelimiter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
} from 'classnames/tailwind'
import useScrollToTop from 'hooks/useScrollToTop'

const blocksWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-12')
)

const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-baseline'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

export default function () {
  useScrollToTop()

  return (
    <div className={blocksWrapper}>
      <Card>
        <QuestionOfDayText>Question of day</QuestionOfDayText>
        <HeaderText size="medium">
          Hey VCs, what should startup do to capture your attention?
        </HeaderText>
        <span className={postInfo}>
          <StatusText>Posted by: </StatusText>
          <Sender sender={'Sealcaster'} />
          <Delimiter />
          <Sender sender={'Farcaster'} />
        </span>
        <VertialDelimiter />
      </Card>
      <BurnerBlock />
      <HowItWorks />
      <BlockchainList />
    </div>
  )
}
