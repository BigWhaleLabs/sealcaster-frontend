import { BodyText, HeaderText } from 'components/ui/Text'
import LinkButton from 'components/ProcessingCard/LinkButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
  maxWidth,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6', 'sm:gap-y-2'),
  alignItems('items-center')
)
const textWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const descriptionText = classnames(
  maxWidth('max-w-processing-content'),
  margin('mx-2', 'sm:mx-0')
)

export default function ({ id }: { id?: number }) {
  return (
    <div className={wrapper}>
      <div className={textWrapper}>
        <HeaderText center size="small">
          Cast rejected — that’s embarrassing
        </HeaderText>
        <div className={descriptionText}>
          <BodyText center>
            Casts are rejected if they contain extreme profanity, are duplicates
            of recent posts, or are spam.
          </BodyText>
        </div>
      </div>

      {id && <LinkButton internal url={`/cast#id=${id}`} />}
    </div>
  )
}
