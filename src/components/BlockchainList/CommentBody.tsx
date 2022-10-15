import { BodyText, LinkText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BareCard from 'components/BareCard'
import Delimiter from 'components/ui/Delimiter'
import PostTime from 'components/BlockchainList/PostTime'
import ReplyIcon from 'icons/ReplyIcon'
import ReplyInput from 'components/BlockchainList/ReplyInput'
import ReplyModel from 'models/ReplyModel'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

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
        {truncateMiddleIfNeeded(address, 16)}
      </LinkText>
    </div>
    <div className={displayTo('md')}>
      <LinkText url={getEtherscanAddressUrl(address)} extraSmall primary>
        {truncateMiddleIfNeeded(address, 12)}
      </LinkText>
    </div>
  </>
)

export default function ({
  content,
  replier,
  timestamp,
  threadId,
  replyToId,
  repliedTo = '',
  canReply,
}: {
  content: string
  replier: string
  timestamp: number
  repliedTo?: string
} & ReplyModel) {
  const [inputOpen, setInputOpen] = useState(false)

  return (
    <BareCard data-anchor={`#reply=${replyToId}`}>
      <div className={space('space-y-4')}>
        <div className={commentWithReplyButton}>
          <div className={commentWithData}>
            <BodyText>{content}</BodyText>
            <div className={infoBlock}>
              <TruncatedAddress address={replier} />
              <Delimiter color="bg-formal-accent" />
              <PostTime timestamp={timestamp} />
            </div>
          </div>
          <button
            className={display(
              { hidden: !replyToId || !canReply },
              { 'md:flex': !!replyToId && canReply }
            )}
            onClick={() => setInputOpen(!inputOpen)}
          >
            <ReplyIcon />
          </button>
        </div>
        {inputOpen && (
          <ReplyInput
            threadId={threadId}
            replyToId={replyToId}
            placeholder={`Reply to ${truncateMiddleIfNeeded(repliedTo, 16)}`}
          />
        )}
      </div>
    </BareCard>
  )
}
