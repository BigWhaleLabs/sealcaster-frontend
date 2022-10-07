import { useSnapshot } from 'valtio'
import PostStore, { fetchThread } from 'stores/PostStore'

export default function () {
  const { questionDay } = useSnapshot(PostStore)

  const { post, sender, id } = questionDay
  const numberId = Number(id)

  const { threads } = useSnapshot(PostStore)
  const thread = threads[numberId]

  if (!thread) {
    fetchThread(numberId)
    return null
  }

  return { post, sender, threadId: numberId, thread }
}
