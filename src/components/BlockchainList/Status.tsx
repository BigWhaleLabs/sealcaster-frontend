import { PostStatus, PostStatusText } from 'models/PostStatus'
import { StatusText } from 'components/ui/Text'
import classnames, { alignItems, display } from 'classnames/tailwind'

const statusContainer = classnames(display('flex'), alignItems('items-center'))

export default function ({ blockchainId }: { blockchainId: number }) {
  const status: PostStatus = PostStatus.pending
  const statusColor = (status: PostStatus) => {
    switch (status) {
      case PostStatus.pending:
        return 'accent'
      case PostStatus.rejected:
        return 'error'
      case PostStatus.published:
        return 'primary'
    }
  }

  return (
    <a href={`#id=${blockchainId}`} className={statusContainer}>
      <StatusText color={statusColor(status)}>
        {PostStatusText[status]}
      </StatusText>
    </a>
  )
}
