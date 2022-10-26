import { QuestionOfDayText } from 'components/ui/Text'
import Delimiter from 'components/ui/Delimiter'
import StickLabel from 'components/QuestionOfTheDay/StickLabel'
import classnames, {
  animation,
  backgroundColor,
  backgroundImage,
  borderColor,
  borderRadius,
  borderWidth,
  display,
  flexDirection,
  gap,
  gradientColorStops,
  height,
  padding,
  position,
  width,
} from 'classnames/tailwind'

const threadLoading = classnames(
  position('relative'),
  backgroundColor('bg-primary-dark'),
  borderRadius('rounded-2xl'),
  borderColor('border-half-grey'),
  borderWidth('border'),
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  padding('p-6')
)

const blocksLoading = classnames(
  animation('animate-pulse'),
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const commonBlockStyles = classnames(
  backgroundImage('bg-gradient-to-r'),
  gradientColorStops('from-secondary-dark', 'to-secondary-semi-dark'),
  borderRadius('rounded-lg')
)
const firstBlock = classnames(commonBlockStyles, height('h-4'), width('w-1/4'))
const secondBlock = classnames(
  commonBlockStyles,
  height('h-8'),
  width('w-full')
)
const thirdBlock = classnames(commonBlockStyles, height('h-8'), width('w-1/3'))

export const LoadingReplies = () => <div className={firstBlock} />

export default function ({ isQoD }: { isQoD?: boolean }) {
  return (
    <div className={threadLoading}>
      {isQoD && <QuestionOfDayText>Question of the day:</QuestionOfDayText>}
      <div className={blocksLoading}>
        {!isQoD && <div className={firstBlock} />}
        <div className={secondBlock} />
        <div className={thirdBlock} />
        <Delimiter color="bg-half-grey" horizontal />
        <LoadingReplies />
      </div>
      {isQoD && <StickLabel />}
    </div>
  )
}
