import { AccentText, BodyText } from 'components/ui/Text'
import { JSX } from 'preact/jsx-runtime'
import Checkmark from 'icons/Checkmark'
import Spinner from 'icons/Spinner'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
} from 'classnames/tailwind'

const castLoading = classnames(
  display('flex'),
  flexDirection('flex-col'),
  backgroundColor('bg-primary-background'),
  padding('p-6'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  borderRadius('rounded-lg'),
  gap('gap-y-4')
)
const loadingBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

export default function ({
  completed,
  errorBlock,
  loadingText = 'Loading',
  subtitle = 'Hang tight! We’re fetching the content.',
}: {
  loadingText?: string
  subtitle?: string | JSX.Element
  errorBlock?: JSX.Element
  completed?: boolean
}) {
  return (
    <div className={castLoading}>
      {errorBlock}
      <AccentText small color="text-tertiary">
        <span className={loadingBlock}>
          {loadingText} {completed ? <Checkmark /> : <Spinner />}
        </span>
      </AccentText>
      {typeof subtitle === 'string' ? (
        <BodyText>{subtitle}</BodyText>
      ) : (
        subtitle
      )}
    </div>
  )
}
