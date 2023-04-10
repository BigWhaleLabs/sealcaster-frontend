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
  requested: {},
  threads: {},
})

export async function fetchFarcasterThread(postId: number) {
  if (farcasterStore.requested[postId]) return
  farcasterStore.requested[postId] = true

  try {
    const { casts, hash } = await fetchThreadByPostId(postId)
    const merkles = casts.map((cast) => cast.hash)

    farcasterStore.threads[postId] = Promise.resolve(merkles)
    if (hash) postIdsStatuses.idToMerkleRoot[postId] = Promise.resolve(hash)
    casts.forEach((cast) => {
      farcasterStore.casts[cast.hash] = Promise.resolve(cast)
      if (cast.postId) {
        postIdsStatuses.idToMerkleRoot[cast.postId] = Promise.resolve(cast.hash)
      }
    })
  } finally {
    farcasterStore.requested[postId] = false
  }
}

export default farcasterStore
