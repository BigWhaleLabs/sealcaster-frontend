import { BodyText, LinkText, StatusText } from 'components/ui/Text'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import Delimiter from 'components/ui/Delimiter'
import SmallArrow from 'components/ui/SmallArrow'
import TimeStore from 'stores/TimeStore'
import classnames, {
  alignItems,
  backgroundColor,
  display,
  flexDirection,
  gap,
  height,
  inset,
  position,
  width,
} from 'classnames/tailwind'
import formatDate from 'helpers/formatDate'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'

const singleComment = classnames(
  display('flex'),
  position('relative'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)
const infoBlock = classnames(
  display('flex'),
  alignItems('items-center'),
  gap('gap-x-2')
)

const commentBorder = classnames(
  position('absolute'),
  inset('top-12', 'left-0'),
  width('w-0.5'),
  height('h-full'),
  backgroundColor('bg-primary-semi-dimmed')
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
    <div className={singleComment}>
      <a href="#comment-1" className={commentBorder} />
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
  )
}
