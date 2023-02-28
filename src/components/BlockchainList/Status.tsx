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

export function StatusSuspended({ postId }: { postId: number }) {
  const { statuses, idToMerkleRoot } = useSnapshot(postIdsStatuses)
  const status = statuses[postId]
  const serviceId = idToMerkleRoot[postId]

  const statusOrLoading = PostStatusText[status] || <LoadingWithDots />
  const farcasterCastUrl = `https://warpcast.com/sealcaster/${serviceId}`

  return (
    <div className={statusContainer}>
      {status === PostStatus.published ? (
        <ExternalLink url={farcasterCastUrl}>
          <StatusText color={statusColor(status)}>{statusOrLoading}</StatusText>
        </ExternalLink>
      ) : (
        <StatusText color={statusColor(status)}>{statusOrLoading}</StatusText>
      )}
    </div>
  )
}

export default function ({ postId }: { postId: number }) {
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
      <StatusSuspended postId={postId} />
    </Suspense>
  )
}
