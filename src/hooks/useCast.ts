import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { useSnapshot } from 'valtio'
import farcasterStore from 'stores/FarcasterStore'
import postIdsStatuses from 'stores/PostIdsStatuses'
import useFarcasterThread from 'hooks/useFarcasterThread'

export default function useCast(post?: PostStructOutput) {
  const { casts } = useSnapshot(farcasterStore)
  const { statuses } = useSnapshot(postIdsStatuses)
  const serviceId = post
    ? statuses[post.id.toNumber() - 1].serviceId
    : undefined
  const farcasterThread = useFarcasterThread(serviceId)

  return {
    farcasterThread,
    cast: serviceId ? casts[serviceId] : null,
  }
}
