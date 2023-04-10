import { useSnapshot } from 'valtio'
import PostStore, { fetchThread } from 'stores/PostStore'

export default function (threadId: number, allowFetch = true) {
  const { posts, threads } = useSnapshot(PostStore)
  const thread = threads[threadId]

  if (!thread && allowFetch) {
    void fetchThread(threadId)
    return
  }

  const postsCopy = { ...posts }
  return Array.from(thread ?? [], (id) => postsCopy[id]).sort(
    (a, b) => b.timestamp.toNumber() - a.timestamp.toNumber()
  )
}
