import {
  alignItems,
  backgroundColor,
  borderRadius,
  classnames,
  display,
  gap,
  padding,
} from 'classnames/tailwind'
import Comment from 'components/BlockchainList/Comment'
import Reply from 'icons/Reply'

const wrapper = classnames(
  display('flex'),
  gap('gap-x-2'),
  alignItems('items-center'),
  backgroundColor('bg-primary-background'),
  borderRadius('rounded-lg'),
  padding('p-4')
)

export default function () {
  const timestamp = 1664908789068
  const replier = '0x237F45C309F37F8958DaeBc9B10630867876B71b'
  const repliedTo = '0x9F44Bd870c03Bda38bc18f277D04A1C9E9318FeA'
  const content =
    'Decentralized inputs electronic cash peer-to-peer satoshis segwit, hash block reward digital signature? Bitcoin Improvement Proposal sats Satoshi Nakamoto.'

  return (
    <div className="flex flex-col gap-y-3">
      <div className={wrapper}>
        <Comment
          timestamp={timestamp}
          content={content}
          replier={replier}
          repliedTo={repliedTo}
          replies={['abc', 'def', 'ghi']}
        />

        <div className={display('flex')}>
          <Reply />
        </div>
      </div>

      <div className={wrapper}>
        <Comment
          timestamp={timestamp}
          content={content}
          replier={replier}
          repliedTo={repliedTo}
          replies={['abc', 'def', 'ghi']}
        />

        <div className={display('flex')}>
          <Reply />
        </div>
      </div>
    </div>
  )
}
