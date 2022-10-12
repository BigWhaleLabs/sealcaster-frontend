import { Cast, fetchAllPosts, fetchThreadById } from 'helpers/farcaster'
import { proxy } from 'valtio'

const farcasterStore = proxy<{
  casts: Promise<Cast[]>
  threadCasts: { [threadId: string]: Promise<Cast[]> }
}>({
  casts: fetchAllPosts(),
  threadCasts: {},
})

export function fetchFarcasterThread(threadId: string) {
  if (typeof farcasterStore.threadCasts[threadId] !== 'undefined') return
  farcasterStore.threadCasts[threadId] = fetchThreadById(threadId)
}

export default farcasterStore
