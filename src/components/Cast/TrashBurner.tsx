import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import classnames, {
  alignSelf,
  margin,
  textColor,
  textDecoration,
} from 'classnames/tailwind'

const mobileBurnerButtonWrapper = classnames(displayTo('md'), margin('mt-2'))

const trashBurnerWrapper = classnames(
  alignSelf('self-center'),
  textDecoration('underline'),
  textColor('text-secondary')
)

export default function () {
  return (
    <span className={trashBurnerWrapper}>
      <Button type="tertiary" onClick={() => BurnerWalletStore.burn()}>
        <AccentText extraSmall color="text-secondary">
          <span className={displayFrom('md')}>Trash Burner</span>
          <span className={mobileBurnerButtonWrapper}>
            Trash Burner and disconnect
          </span>
        </AccentText>
      </Button>
    </span>
  )
}
