import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import Sizes from 'models/MarkSizes'
import Tooltip from 'components/ui/Tooltip'
import classnames, {
  alignItems,
  alignSelf,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  margin,
  space,
  textDecoration,
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
  flexDirection('md:flex-row', 'flex-col'),
  alignItems('md:items-center'),
  space('md:space-y-0', 'space-y-4')
)

const trashBurnerWrapper = classnames(
  textDecoration('underline'),
  displayFrom('md')
)

const mobileTrashBurnerWrapper = classnames(
  textDecoration('underline'),
  displayTo('md'),
  margin('mt-2')
)

export default function () {
  const zkProofText =
    'You’re casting from the burner you just created. You’re anonymous now. This will persist between page loads until you disconnect.'

  return (
    <div className={textAreaInfoWrapper}>
      <AccentText extraSmall color="text-accent">
        <Tooltip position="bottom" fitContainer text={zkProofText}>
          <span className={hintWrapper}>
            <span>Posting from burner wallet</span>
            <br />
            <CharInCircle size={Sizes.Small} char="?" />
          </span>
        </Tooltip>
      </AccentText>
      <div className={displayTo('md')}>
        <Button disabled fullWidth center type="primary">
          Cast
        </Button>
      </div>
      <span className={alignSelf('self-center')}>
        <Button type="tertiary">
          <AccentText extraSmall color="text-secondary">
            <span className={trashBurnerWrapper}>Trash Burner</span>
            <span className={mobileTrashBurnerWrapper}>
              Trash Burner and disconnect
            </span>
          </AccentText>
        </Button>
      </span>
    </div>
  )
}
