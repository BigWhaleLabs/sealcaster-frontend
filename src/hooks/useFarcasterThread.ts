import { useSnapshot } from 'valtio'
import farcasterStore, { fetchFarcasterThread } from 'stores/FarcasterStore'

export default function (threadMerkleRoot?: string) {
  const { threads, casts } = useSnapshot(farcasterStore)

  if (!threadMerkleRoot) return []

  const thread = threads[threadMerkleRoot]

  if (!thread) {
    fetchFarcasterThread(threadMerkleRoot)
    return null
  }

  const castsCopy = { ...casts }
  return Array.from(thread).map((id) => castsCopy[id])
}
