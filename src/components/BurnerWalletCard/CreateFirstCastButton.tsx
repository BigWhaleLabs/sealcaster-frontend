import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Button from 'components/ui/Button'

export default function () {
  return (
    <>
      <div className={displayTo('xs')}>
        <Button small type="primary">
          Create your first cast
        </Button>
      </div>
      <div className={displayFrom('xs')}>
        <Button type="primary">Create your first cast</Button>
      </div>
    </>
  )
}
