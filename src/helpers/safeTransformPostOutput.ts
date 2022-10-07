import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'

export default function ([
  id,
  post,
  derivativeAddress,
  sender,
  timestamp,
]: PostStructOutput) {
  return {
    id,
    post,
    derivativeAddress,
    sender,
    timestamp,
  } as PostStructOutput
}
