import { Cast } from 'models/Cast'
import { proxy } from 'valtio'
import fetchThreadByPostId from 'helpers/farcaster'
import postIdsStatuses from 'stores/PostIdsStatuses'

const farcasterStore = proxy<{
  casts: { [merkleRoot: string]: Promise<Cast> }
  threads: { [postId: number]: Promise<string[]> }
  requested: { [postId: number]: boolean }
}>({
  casts: {},
  threads: {},
  requested: {},
})

export async function fetchFarcasterThread(postId: number) {
  if (farcasterStore.requested[postId]) return
  farcasterStore.requested[postId] = true

  try {
    const { casts, merkleRoot } = await fetchThreadByPostId(postId)
    const merkles = casts.map((cast) => cast.merkleRoot)

    farcasterStore.threads[postId] = Promise.resolve(merkles)
    if (merkleRoot)
      postIdsStatuses.idToMerkleRoot[postId] = Promise.resolve(merkleRoot)
    casts.forEach((cast) => {
      farcasterStore.casts[cast.merkleRoot] = Promise.resolve(cast)
      if (cast.postId) {
        postIdsStatuses.idToMerkleRoot[cast.postId] = Promise.resolve(
          cast.merkleRoot
        )
      }
    })
  } finally {
    farcasterStore.requested[postId] = false
  }
}

export default farcasterStore
