import { useSnapshot } from 'valtio'
import farcasterStore from 'stores/FarcasterStore'
import postIdsStatuses from 'stores/PostIdsStatuses'
import useFarcasterThread from 'hooks/useFarcasterThread'

export default function useCast(postId: number) {
  const { casts } = useSnapshot(farcasterStore)
  const { idToMerkleRoot } = useSnapshot(postIdsStatuses)

  const serviceId = postId > 0 ? idToMerkleRoot[postId - 1] : undefined

  const farcasterThread = useFarcasterThread(serviceId)

  return {
    farcasterThread,
    cast: serviceId ? casts[serviceId] : null,
  }
}
