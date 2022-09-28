import { Link } from 'wouter'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'

export default function () {
  const { used } = useSnapshot(BurnerWalletStore)

  return (
    <Link href="/cast">
      <div className={displayTo('xs')}>
        <Button small type="primary">
          Create your {!used && 'first'} cast
        </Button>
      </div>
      <div className={displayFrom('xs')}>
        <Button type="primary">Create your {!used && 'first'} cast</Button>
      </div>
    </Link>
  )
}
