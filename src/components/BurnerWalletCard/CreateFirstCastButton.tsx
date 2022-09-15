import { Link } from 'wouter'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Button from 'components/ui/Button'

export default function () {
  return (
    <Link href="/cast">
      <div className={displayTo('xs')}>
        <Button small type="primary">
          Create your first cast
        </Button>
      </div>
      <div className={displayFrom('xs')}>
        <Button type="primary">Create your first cast</Button>
      </div>
    </Link>
  )
}
