import {
  AccentText,
  HeaderText,
  QuestionOfDayText,
  StatusText,
} from 'components/ui/Text'
import BlockchainList from 'components/BlockchainList'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import CastBlock from 'components/Cast/CastBlock'
import CastHeader from 'components/Cast/CastHeader'
import Delimiter from 'components/ui/Delimiter'
import PostProcessing from 'components/ProcessingCard'
import QuestionOfTheDay from 'components/ui/QuestionOfTheDay'
import Sender from 'components/BlockchainList/Sender'
import Thread from 'icons/Thread'
import VertialDelimiter from 'components/ui/VertialDelimiter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  margin,
  space,
  textColor,
} from 'classnames/tailwind'
import useScrollToTop from 'hooks/useScrollToTop'

const processingCardWrapper = classnames(
  flexDirection('flex-col'),
  display('flex'),
  gap('gap-y-6', 'sm:gap-y-12')
)

export default function () {
  useScrollToTop()

  return (
    <div className={processingCardWrapper}>
      <>
        <QuestionOfTheDay />
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
