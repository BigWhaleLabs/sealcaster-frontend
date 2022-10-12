import { BodyText, PostText, StatusText } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import Card from 'components/ui/Card'
import Delimiter from 'components/ui/Delimiter'
import EtherScanLink from 'components/BlockchainList/EtherScanLink'
import PostTime from 'components/BlockchainList/PostTime'
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
  alignItems('items-baseline', 'xs:items-center'),
  flexWrap('flex-wrap'),
  gap('gap-x-2')
)

function PostDelimiter() {
  return (
    <div className={displayFrom('xs')}>
      <Delimiter color="bg-formal-accent" />
    </div>
  )
}

export default function ({
  blockchainId,
  timestamp,
  text,
  sender,
  tx,
  limitThread,
  clickablePost,
}: {
  blockchainId: number
  timestamp: number
  text: string
  sender: string
  tx: string
  limitThread?: number
  clickablePost?: boolean
}) {
  return (
    <div data-anchor={`#id=${blockchainId}`}>
      <Card hoverEffect={clickablePost}>
        <a href={clickablePost ? `/thread/${blockchainId}` : undefined}>
          <div className={container}>
            <PostText>{text}</PostText>

            <div className={postBottom}>
              <BodyText primary>
                <span className={postInfo}>
                  <StatusText>Posted by: </StatusText>
                  <Sender sender={sender} />
                  <PostDelimiter />
                  <EtherScanLink tx={tx} />
                  <PostDelimiter />
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
        </a>

        <ThreadPart
          threadId={blockchainId}
          replyingTo={sender}
          limitThread={limitThread}
          postId={blockchainId}
        />
      </Card>
    </div>
  )
}
