import BlockchainList from 'components/BlockchainList'
import CastBlock from 'components/Cast/CastBlock'
import CastHeader from 'components/Cast/CastHeader'
import NoBurner from 'components/BurnerWalletCard/NoBurner'
import PostProcessing from 'components/ProcessingCard'
import QuestionOfTheDay from 'components/ui/QuestionOfTheDay'
import classnames, { margin, space } from 'classnames/tailwind'
import useScrollToTop from 'hooks/useScrollToTop'

const questionBlockWrapper = classnames(
  margin('mt-9', 'md:mt-24'),
  space('space-y-6')
)

const castBlockWrapper = classnames(
  space('space-y-9'),
  margin('mt-36', 'sm:mt-24')
)

export default function () {
  useScrollToTop()

  return (
    <>
      <NoBurner />
      <div className={questionBlockWrapper}>
        <QuestionOfTheDay />
        <PostProcessing />
      </div>
      <div className={castBlockWrapper}>
        <CastHeader />
        <CastBlock threadId={0} />
      </div>
      <div className={margin('mt-11')}>
        <BlockchainList />
      </div>
    </>
  )
}
