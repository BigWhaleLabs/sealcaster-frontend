import { PostStatus, PostStatusText } from 'models/PostStatus'
import { StatusText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import ExternalLink from 'components/ui/ExternalLink'
import LoadingWithDots from 'components/ui/LoadingWithDots'
import classnames, { alignItems, display } from 'classnames/tailwind'
import postIdsStatuses from 'stores/PostIdsStatuses'

const statusContainer = classnames(display('flex'), alignItems('items-center'))

const statusColor = (status: PostStatus) => {
  switch (status) {
    case PostStatus.rejected:
    case PostStatus.failedToPost:
      return 'error'
    case PostStatus.published:
      return 'primary'
    default:
      return 'accent'
  }
}

export function StatusSuspended({ blockchainId }: { blockchainId: number }) {
  const { statuses } = useSnapshot(postIdsStatuses)
  const status = statuses[blockchainId]?.status
  const serviceId = statuses[blockchainId]?.serviceId

  return (
    <div className={statusContainer}>
      <ExternalLink url={`farcaster://casts/${serviceId}`}>
        <StatusText color={statusColor(status || PostStatus.pending)}>
          {PostStatusText[status] || <LoadingWithDots />}
        </StatusText>
      </ExternalLink>
    </div>
  )
}

export default function ({ blockchainId }: { blockchainId: number }) {
  return (
    <Suspense
      fallback={
        <div className={statusContainer}>
          <StatusText color={statusColor(PostStatus.pending)}>
            <LoadingWithDots />
          </StatusText>
        </div>
      }
    >
      <StatusSuspended blockchainId={blockchainId} />
    </Suspense>
  )
}
