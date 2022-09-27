import { AccentText } from 'components/ui/Text'
import { displayTo } from 'helpers/visibilityClassnames'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import Sizes from 'models/MarkSizes'
import Tooltip from 'components/ui/Tooltip'
import TrashBurner from 'components/Cast/TrashBurner'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
} from 'classnames/tailwind'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1'),
  fontSize('text-xs')
)

const textAreaInfoWrapper = classnames(
  display('flex'),
  justifyContent('justify-between'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('md:items-center'),
  gap('gap-y-4', 'md:gap-y-0')
)

export default function ({
  loading,
  disabled,
  onButtonClick,
}: {
  loading?: boolean
  disabled?: boolean
  onButtonClick?: () => void
}) {
  const castingHintText =
    'You’re casting from a burner wallet. Burner wallet is an anonymous wallet that’s not tied to your identity. It will persist between page loads until you disconnect.'

  return (
    <div className={textAreaInfoWrapper}>
      <AccentText extraSmall color="text-accent">
        <span className={hintWrapper}>
          Posting from burner wallet
          <br />
          <Tooltip position="bottom" fitContainer text={castingHintText}>
            <CharInCircle size={Sizes.Small} char="?" />
          </Tooltip>
        </span>
      </AccentText>
      <div className={displayTo('md')}>
        <Button
          loading={loading}
          fullWidth
          center
          type="primary"
          disabled={disabled}
          onClick={onButtonClick}
        >
          Cast
        </Button>
      </div>
      {loading && (
        <div className={displayTo('md')}>
          <AccentText extraSmall color="text-accent">
            Hang on, this often takes a minute or two...
          </AccentText>
        </div>
      )}
      <TrashBurner />
    </div>
  )
}
