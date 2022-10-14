import { PostStatus } from 'models/PostStatus'
import { useSnapshot } from 'valtio'
import Approved from 'components/ProcessingCard/Approved'
import FailedToPost from 'components/ProcessingCard/FailedToPost'
import Pending from 'components/ProcessingCard/Pending'
import PostIdsStatuses from 'stores/PostIdsStatuses'
import Rejected from 'components/ProcessingCard/Rejected'
import classnames, {
  backgroundColor,
  borderRadius,
  padding,
  width,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const cardWrapper = classnames(
  width('w-full'),
  backgroundColor('bg-primary-background'),
  padding('py-6', 'px-4', 'sm:px-6'),
  borderRadius('rounded-2xl')
)

const CastState = ({
  status,
  castId,
}: {
  status: PostStatus
  castId?: number
}) => {
  switch (status) {
    case PostStatus.approved:
    case PostStatus.published:
      return <Approved id={castId} />
    case PostStatus.rejected:
      return <Rejected id={castId} />
    case PostStatus.failedToPost:
      return <FailedToPost id={castId} />
    default:
      return <Pending />
  }
}

export default function () {
  const { lastUserPost } = useSnapshot(PostIdsStatuses)
  const { account } = useSnapshot(walletStore)

  if (!account || !lastUserPost || !lastUserPost[account]) return null

  const { status, id } = lastUserPost[account]

  return (
    <div className={cardWrapper}>
      <CastState status={status} castId={id} />
    </div>
  )
}
