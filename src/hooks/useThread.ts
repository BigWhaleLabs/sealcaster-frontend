import { useSnapshot } from 'valtio'
import PostStore, { fetchThread } from 'stores/PostStore'

export default function (threadId: number) {
  const { threads, posts } = useSnapshot(PostStore)
  const thread = threads[threadId]

  if (!thread) {
    void fetchThread(threadId)
    return
  }

  const postsCopy = { ...posts }
  return Array.from(thread)
    .map((id) => postsCopy[id])
    .sort((a, b) => b.timestamp.toNumber() - a.timestamp.toNumber())
}
