import { TrashButtonText } from 'components/ui/Text'
import { useLocation } from 'wouter'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import classnames, { alignSelf, margin } from 'classnames/tailwind'

const buttonWrapper = classnames(
  alignSelf('self-center'),
  margin('mt-2', 'md:mt-0')
)

export default function () {
  const [, setLocation] = useLocation()

  return (
    <span className={buttonWrapper}>
      <Button
        type="tertiary"
        onClick={() => {
          const confirmation = window.confirm(
            'Are you sure you want to trash burner wallet and disconnect?'
          )
          if (!confirmation) return
          BurnerWalletStore.burn()
          setLocation('/')
        }}
      >
        <TrashButtonText>Trash wallet and disconnect</TrashButtonText>
      </Button>
    </span>
  )
}
