import { useSnapshot } from 'valtio'
import PostStore, { fetchPost, fetchThread } from 'stores/PostStore'

export default function (threadId: number) {
  const { threads, posts } = useSnapshot(PostStore)
  const thread = threads[threadId]
  const post = posts[threadId]

  if (!thread) {
    fetchThread(threadId)
    return null
  }

  if (!post) {
    fetchPost(threadId)
    return null
  }

  return { ...post, threadId, thread: Object.values(thread) }
}
