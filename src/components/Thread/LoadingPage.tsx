import { AccentText, BodyText } from 'components/ui/Text'
import Delimiter from 'components/ui/Delimiter'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
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
  justifyContent,
  padding,
  space,
  width,
} from 'classnames/tailwind'

const castLoading = classnames(
  display('flex'),
  flexDirection('flex-col'),
  backgroundColor('bg-primary-background'),
  padding('p-6'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  gap('gap-y-4')
)
const loadingBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

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

export default function () {
  return (
    <div className={space('space-y-4')}>
      <div className={castLoading}>
        <AccentText color="text-tertiary">
          <span className={loadingBlock}>
            Loading <Spinner />
          </span>
        </AccentText>
        <BodyText>Hang tight as we fetch content.</BodyText>
      </div>
      <div className={threadLoading}>
        <div className={blocksLoading}>
          <div className={firstBlock} />
          <div className={secondBlock} />
          <div className={thirdBlock} />
          <Delimiter color="bg-half-grey" horizontal />
          <div className={firstBlock} />
        </div>
      </div>
    </div>
  )
}
