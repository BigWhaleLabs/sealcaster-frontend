import { BodyText, LinkText, PostText, StatusText } from 'components/ui/Text'
import { useSnapshot } from 'valtio'
import Card from 'components/ui/Card'
import Delimiter from 'components/ui/Delimiter'
import PostTime from 'components/BlockchainList/PostTime'
import Status from 'components/BlockchainList/Status'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  flexWrap,
  gap,
  justifyContent,
  space,
} from 'classnames/tailwind'
import getEtherscanAddressUrl from 'helpers/getEtherscanAddressUrl'
import truncateMiddleIfNeeded from 'helpers/truncateMiddleIfNeeded'

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
  alignItems('items-baseline'),
  flexWrap('flex-wrap'),
  gap('gap-x-1')
)

function Sender({ sender }: { sender: string }) {
  const { account } = useSnapshot(WalletStore)
  return (
    <LinkText extraSmall title={sender} url={getEtherscanAddressUrl(sender)}>
      {sender === account ? 'you' : truncateMiddleIfNeeded(sender, 13)}
    </LinkText>
  )
}

export default function ({
  blockchainId,
  timestamp,
  text,
  sender,
  derivativeAddress,
}: {
  blockchainId: number
  timestamp: number
  text: string
  sender: string
  derivativeAddress: string
}) {
  return (
    <div data-anchor={`#id=${blockchainId}`} style={{ height: 'fit-content' }}>
      <Card>
        <div className={container}>
          <PostText>{text}</PostText>
          <div className={postBottom}>
            <BodyText primary>
              <span className={postInfo}>
                <StatusText>Posted by: </StatusText>
                <Sender sender={sender} />
                <Delimiter />
                <LinkText
                  extraSmall
                  title={derivativeAddress}
                  url={getEtherscanAddressUrl(derivativeAddress)}
                >
                  Etherscan
                </LinkText>
                <Delimiter />
                <Status blockchainId={blockchainId} />
              </span>
            </BodyText>
            <BodyText primary noWrap>
              <PostTime timestamp={timestamp} />
            </BodyText>
          </div>
        </div>
      </Card>
    </div>
  )
}
