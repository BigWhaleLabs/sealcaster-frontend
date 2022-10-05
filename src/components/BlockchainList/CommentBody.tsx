import { BodyText, LinkText, StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/ui/Delimiter'
import Reply from 'icons/Reply'
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

const commentWithReplyButton = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-between'),
  backgroundColor('bg-primary-background'),
  borderRadius('rounded-lg'),
  padding('p-4')
)
const leftPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)
const infoBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
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
  const formattedTime = formatDate(timestamp, current)

  return (
    <div className={commentWithReplyButton}>
      <div className={leftPart}>
        <BodyText>{content}</BodyText>
        <div className={infoBlock}>
          <LinkText url={getEtherscanAddressUrl(replier)} extraSmall primary>
            {truncateMiddleIfNeeded(replier, 12)}
          </LinkText>
          <SmallArrow />
          <LinkText url={getEtherscanAddressUrl(repliedTo)} extraSmall primary>
            {truncateMiddleIfNeeded(repliedTo, 12)}
          </LinkText>
          <Delimiter color="bg-formal-accent" />
          <StatusText primary textRight>
            {formattedTime}
          </StatusText>
        </div>
      </div>
      <div className={display('flex')}>
        <Reply />
      </div>
    </div>
  )
}
