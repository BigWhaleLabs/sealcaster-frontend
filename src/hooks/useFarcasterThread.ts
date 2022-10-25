import { useSnapshot } from 'valtio'
import farcasterStore, { fetchFarcasterThread } from 'stores/FarcasterStore'

export default function (postId: number, allowFetch = true) {
  const { threads, casts } = useSnapshot(farcasterStore)

  if (!postId) return []

  const thread = threads[postId]

  if (!thread && allowFetch) {
    void fetchFarcasterThread(postId)
    return null
  }

  const castsCopy = { ...casts }
  return Array.from(thread ?? [], (id) => castsCopy[id])
}
