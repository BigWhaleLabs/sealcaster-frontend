import { useSnapshot } from 'valtio'
import PostStore, { fetchThread } from 'stores/PostStore'

export default function (threadId: number) {
  const { threads } = useSnapshot(PostStore)
  const thread = threads[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  return Array.from(thread)
}
