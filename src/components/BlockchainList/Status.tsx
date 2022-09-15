import { PostStatus, PostStatusText } from 'models/PostStatus'
import { StatusText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { useSnapshot } from 'valtio'
import classnames, { alignItems, display } from 'classnames/tailwind'
import postIdsStatuses from 'stores/PostIdsStatuses'

const statusContainer = () =>
  classnames(display('flex'), alignItems('items-center'))

const statusColor = (status: PostStatus) => {
  switch (status) {
    case PostStatus.pending:
      return 'accent'
    case PostStatus.approved:
      return 'accent'
    case PostStatus.rejected:
      return 'error'
    case PostStatus.published:
      return 'primary'
  }
}

export function StatusSuspended({ blockchainId }: { blockchainId: number }) {
  const { statuses } = useSnapshot(postIdsStatuses)
  const status = statuses[blockchainId]?.status

  return (
    <a href={`#&id=${blockchainId}`} className={statusContainer()}>
      <StatusText color={statusColor(status || PostStatus.pending)}>
        {PostStatusText[status] || 'Loading...'}
      </StatusText>
    </a>
  )
}

export default function ({ blockchainId }: { blockchainId: number }) {
  return (
    <Suspense
      fallback={
        <div className={statusContainer()}>
          <StatusText color={statusColor(PostStatus.pending)}>
            <span>Loading...</span>
          </StatusText>
        </div>
      }
    >
      <StatusSuspended blockchainId={blockchainId} />
    </Suspense>
  )
}
