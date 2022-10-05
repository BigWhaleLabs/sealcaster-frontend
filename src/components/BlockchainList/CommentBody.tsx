import { BodyText, LinkText, StatusText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Delimiter from 'components/ui/Delimiter'
import Reply from 'icons/Reply'
import ReplyInput from 'components/BlockchainList/ReplyInput'
import SmallArrow from 'components/ui/SmallArrow'
import TimeStore from 'stores/TimeStore'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
} from 'classnames/tailwind'
import formatDate from 'helpers/formatDate'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const commentWithInput = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-6'),
  backgroundColor('bg-primary-background'),
  borderRadius('rounded-lg'),
  padding('p-4')
)
const commentWithReplyButton = classnames(
  display('flex'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('items-start', 'md:items-center'),
  gap('gap-y-2', 'md:gap-x-2'),
  justifyContent('justify-between')
)
const commentWithData = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-1')
)
const infoBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

const TruncatedAddress = ({ address }: { address: string }) => (
  <>
    <div className={displayFrom('md')}>
      <LinkText url={getEtherscanAddressUrl(address)} extraSmall primary>
        {truncateMiddleIfNeeded(address, 12)}
      </LinkText>
    </div>
    <div className={displayTo('md')}>
      <LinkText url={getEtherscanAddressUrl(address)} extraSmall primary>
        {truncateMiddleIfNeeded(address, 8)}
      </LinkText>
    </div>
  </>
)

export default function ({
  content,
  replier,
  repliedTo,
  timestamp,
}: {
  content: string
  replier: string
  repliedTo: string
  timestamp: number
}) {
  const { current } = useSnapshot(TimeStore)
  const [inputOpen, setInputOpen] = useState(false)
  const formattedTime = formatDate(timestamp, current)

  return (
    <div className={commentWithInput}>
      <div className={commentWithReplyButton}>
        <div className={commentWithData}>
          <BodyText>{content}</BodyText>
          <div className={infoBlock}>
            <TruncatedAddress address={replier} />
            <SmallArrow />
            <TruncatedAddress address={repliedTo} />
            <Delimiter color="bg-formal-accent" />
            <StatusText primary>{formattedTime}</StatusText>
          </div>
        </div>
        <button
          className={display('flex')}
          onClick={() => setInputOpen(!inputOpen)}
        >
          <Reply />
        </button>
      </div>
      <ReplyInput replyingTo={repliedTo} inputOpen={inputOpen} />
    </div>
  )
}
