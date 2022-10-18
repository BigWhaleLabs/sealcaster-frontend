import { useSnapshot } from 'valtio'
import postIdsStatuses from 'stores/PostIdsStatuses'

export default function (postId: number) {
  const { idToMerkleRoot } = useSnapshot(postIdsStatuses)

  return idToMerkleRoot[postId]
}
