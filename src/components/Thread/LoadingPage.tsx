import { space } from 'classnames/tailwind'
import LoadingBlock from 'components/ui/LoadingBlock'
import LoadingPost from 'components/Thread/LoadingPost'

export default function () {
  return (
    <div className={space('space-y-4')}>
      <LoadingBlock />
      <LoadingPost />
    </div>
  )
}
