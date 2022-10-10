import { BodyText, LinkText } from 'components/ui/Text'
import { createRef } from 'preact'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useState } from 'preact/hooks'
import BareCard from 'components/BareCard'
import Delimiter from 'components/ui/Delimiter'
import PostTime from 'components/BlockchainList/PostTime'
import ReplyIcon from 'icons/ReplyIcon'
import ReplyInput from 'components/BlockchainList/ReplyInput'
import ReplyModel from 'models/ReplyModel'
import SmallArrow from 'components/ui/SmallArrow'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import useClickOutside from 'hooks/useClickOutside'

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
  threadId,
  replyToId,
}: {
  content: string
  replier: string
  repliedTo: string
  timestamp: number
} & ReplyModel) {
  const [inputOpen, setInputOpen] = useState(false)
  const ref = createRef()
  useClickOutside(ref, () => setInputOpen(false))

  return (
    // TODO: anchor should be real
    <BareCard data-anchor={`#reply=${replyToId}`}>
      <div className={space('space-y-4')} ref={ref}>
        <div className={commentWithReplyButton}>
          <div className={commentWithData}>
            <BodyText>{content}</BodyText>
            <div className={infoBlock}>
              <TruncatedAddress address={replier} />
              <SmallArrow />
              <TruncatedAddress address={repliedTo} />
              <Delimiter color="bg-formal-accent" />
              <PostTime timestamp={timestamp} />
            </div>
          </div>
          <button
            className={display({ hidden: inputOpen }, 'md:flex')}
            onClick={() => setInputOpen(!inputOpen)}
          >
            <ReplyIcon />
          </button>
        </div>
        {inputOpen && (
          <ReplyInput
            threadId={threadId}
            replyToId={replyToId}
            placeholder={`Reply to ${truncateMiddleIfNeeded(repliedTo, 12)}`}
          />
        )}
      </div>
    </BareCard>
  )
}
