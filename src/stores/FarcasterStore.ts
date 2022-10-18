import { Cast } from 'models/Cast'
import { proxy } from 'valtio'
import fetchThreadByPostId from 'helpers/farcaster'
import postIdsStatuses from 'stores/PostIdsStatuses'

const farcasterStore = proxy<{
  casts: { [merkleRoot: string]: Promise<Cast> }
  threads: { [postId: number]: Promise<string[]> }
}>({
  casts: {},
  threads: {},
})

export function fetchFarcasterThread(postId: number) {
  if (typeof farcasterStore.threads[postId] !== 'undefined') return
  const request = fetchThreadByPostId(postId)
  farcasterStore.threads[postId] = request.then(({ casts }) =>
    casts.map((cast) => cast.merkleRoot)
  )
  void request.then(({ casts, merkleRoot }) => {
    if (merkleRoot)
      postIdsStatuses.idToMerkleRoot[postId] = Promise.resolve(merkleRoot)
    for (const cast of casts) {
      farcasterStore.casts[cast.merkleRoot] = Promise.resolve(cast)
      if (cast.postId) {
        postIdsStatuses.idToMerkleRoot[cast.postId] = Promise.resolve(
          cast.merkleRoot
        )
      }
    }
  })
}

export default farcasterStore
