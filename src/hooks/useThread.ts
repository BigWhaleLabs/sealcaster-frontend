import { useSnapshot } from 'valtio'
import PostStore, { fetchThread } from 'stores/PostStore'

export default function (threadId: number) {
  const { threads, posts } = useSnapshot(PostStore)
  const thread = threads[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  const postsCopy = { ...posts }
  return Array.from(thread).map((id) => postsCopy[id])
}
