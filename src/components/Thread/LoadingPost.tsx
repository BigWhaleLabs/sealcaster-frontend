import Delimiter from 'components/ui/Delimiter'
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
  width,
} from 'classnames/tailwind'

const threadLoading = classnames(
  backgroundColor('bg-primary-dark'),
  borderRadius('rounded-2xl'),
  borderColor('border-half-grey'),
  borderWidth('border'),
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

export default function () {
  return (
    <div className={threadLoading}>
      <div className={blocksLoading}>
        <div className={firstBlock} />
        <div className={secondBlock} />
        <div className={thirdBlock} />
        <Delimiter color="bg-half-grey" horizontal />
        <LoadingReplies />
      </div>
    </div>
  )
}
