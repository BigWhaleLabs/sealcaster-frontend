import { AccentText } from 'components/ui/Text'
import { classnames, display, flexDirection, gap } from 'classnames/tailwind'
import BareCard from 'components/BareCard'
import CommentWithReplies from 'components/BlockchainList/CommentWithReplies'
import Replies from 'components/BlockchainList/Replies'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3')
)

export default function ({
  replyingTo,
  postId,
  limitThread,
}: {
  replyingTo: string
  postId: number
  limitThread?: number
}) {
  // TODO: replace with real data
  const comments = [
    {
      timestamp: 1664908789068,
      replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
      repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
      content:
        'Decentralized inputs electronic cash peer-to-peer satoshis segwit, hash block reward digital signature? Bitcoin Improvement Proposal sats Satoshi Nakamoto.',
      replies: [
        {
          timestamp: 1124908789068,
          replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
          repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
          content: 'Satoshi Nakamoto',
        },
      ],
    },
    {
      timestamp: 1124908789068,
      replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
      repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
      content: 'Decentralized inputs',
    },
    {
      timestamp: 1124908789068,
      replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
      repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
      content: 'Satoshi Nakamoto',
      replies: [
        {
          timestamp: 1124908789068,
          replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
          repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
          content: 'Vitalik Buterin',
          replies: [
            {
              timestamp: 1124908789068,
              replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
              repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
              content: 'Mota mota',
            },
            {
              timestamp: 1124908789068,
              replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
              repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
              content: 'Motorolla',
            },
          ],
        },
        {
          timestamp: 1124908789068,
          replier: '0x237F45C309F37F8958DaeBc9B10630867876B71b',
          repliedTo: '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA',
          content:
            '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        },
      ],
    },
  ]

  const commentsLength = comments.length

  return (
    <div className={wrapper}>
      <Replies count={comments.length} replyingTo={replyingTo} />
      {comments.map(
        ({ timestamp, content, replier, repliedTo, replies }, index) =>
          limitThread ? (
            index < limitThread && (
              <CommentWithReplies
                timestamp={timestamp}
                content={content}
                replier={replier}
                repliedTo={repliedTo}
              />
            )
          ) : (
            <CommentWithReplies
              timestamp={timestamp}
              content={content}
              replier={replier}
              repliedTo={repliedTo}
              replies={replies}
            />
          )
      )}
      {limitThread && (
        <a href={`/thread/${postId}`}>
          <BareCard smallPaddings>
            <AccentText color="text-accent" small>
              + {commentsLength - limitThread}{' '}
              {commentsLength - limitThread > 1 ? 'replies' : 'reply'}
            </AccentText>
          </BareCard>
        </a>
      )}
    </div>
  )
}
