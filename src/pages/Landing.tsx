import { HeaderText, QuestionOfDayText, StatusText } from 'components/ui/Text'
import BlockchainList from 'components/BlockchainList'
import Card from 'components/ui/Card'
import CastBlock from 'components/Cast/CastBlock'
import CastHeader from 'components/Cast/CastHeader'
import Delimiter from 'components/ui/Delimiter'
import PostProcessing from 'components/ProcessingCard'
import Sender from 'components/BlockchainList/Sender'
import VertialDelimiter from 'components/ui/VertialDelimiter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  margin,
  space,
} from 'classnames/tailwind'
import useScrollToTop from 'hooks/useScrollToTop'

const processingCardWrapper = classnames(
  flexDirection('flex-col'),
  display('flex'),
  gap('gap-y-6', 'sm:gap-y-12')
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
    <div className={processingCardWrapper}>
      <>
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
        <PostProcessing />
        <div className={space('space-y-6')}>
          <CastHeader />
          <CastBlock />
        </div>
        <div className={margin('mt-20', 'sm:mt-14')}>
          <BlockchainList />
        </div>
      </>
    </div>
  )
}
