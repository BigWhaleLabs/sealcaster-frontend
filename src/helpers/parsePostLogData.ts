import { utils } from 'ethers'

const transferEventInterface = new utils.Interface([
  `event PostSaved(
    uint256 id,
    string post,
    address indexed derivativeAddress,
    address indexed sender,
    uint256 timestamp
  )`,
])

export default function parsePostLogData({
  data,
  topics,
}: {
  data: string
  topics: string[]
}) {
  return transferEventInterface.parseLog({ data, topics })
}
