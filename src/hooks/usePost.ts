import { useSnapshot } from 'valtio'
import PostStore, { fetchPost } from 'stores/PostStore'

export default function usePost(postId: number) {
  const { posts } = useSnapshot(PostStore)
  const post = posts[postId]

  if (!post) {
    void fetchPost(postId)
    return
  }

  return post
}
