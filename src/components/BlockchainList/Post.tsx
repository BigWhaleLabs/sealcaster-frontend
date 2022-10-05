import { BodyText, PostText, StatusText } from 'components/ui/Text'
import { Delimiter } from 'components/ui/Delimiter'
import Card from 'components/ui/Card'
import EtherScanLink from 'components/BlockchainList/EtherScanLink'
import PostTime from 'components/BlockchainList/PostTime'
import Replies from 'components/BlockchainList/Replies'
import Sender from 'components/BlockchainList/Sender'
import Status from 'components/BlockchainList/Status'
import ThreadPart from 'components/BlockchainList/ThreadPart'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  space('space-y-4')
)
const postBottom = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-between'),
  gap('gap-x-1'),
  alignItems('items-start')
)
const postInfo = classnames(
  display('flex'),
  flexDirection('flex-col', 'xs:flex-row'),
  alignItems('items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-2')
)

export default function ({
  blockchainId,
  timestamp,
  text,
  sender,
  tx,
}: {
  blockchainId: number
  timestamp: number
  text: string
  sender: string
  tx: string
}) {
  return (
    <div data-anchor={`#id=${blockchainId}`}>
      <Card>
        <div className={container}>
          <PostText>{text}</PostText>
          <div className={postBottom}>
            <BodyText primary>
              <span className={postInfo}>
                <StatusText>Posted by: </StatusText>
                <Sender sender={sender} />
                <Delimiter color="bg-formal-accent" />
                <EtherScanLink tx={tx} />
                <Delimiter color="bg-formal-accent" />
                <Status blockchainId={blockchainId} />
              </span>
            </BodyText>
            <BodyText primary noWrap>
              <span className={postInfo}>
                <PostTime timestamp={timestamp} />
              </span>
            </BodyText>
          </div>
        </div>

        <Delimiter color="bg-half-grey" horizontal />

        <Replies />

        <ThreadPart />
      </Card>
    </div>
  )
}
