import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'

export default function ([
  id,
  post,
  derivativeAddress,
  sender,
  timestamp,
  threadId,
  replyToId,
]: PostStructOutput) {
  return {
    derivativeAddress,
    id,
    post,
    replyToId,
    sender,
    threadId,
    timestamp,
  } as PostStructOutput
}
