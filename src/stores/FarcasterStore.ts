import { Cast } from 'models/Cast'
import { proxy } from 'valtio'
import { subscribeKey } from 'valtio/utils'
import fetchThreadByPostId from 'helpers/farcaster'
import postIdsStatuses from 'stores/PostIdsStatuses'

const farcasterStore = proxy<{
  casts: { [merkleRoot: string]: Promise<Cast> }
  threads: { [postId: number]: Promise<string[]> }
}>({
  casts: {},
  threads: {},
})

subscribeKey(postIdsStatuses, 'idToMerkleRoot', (idToMerkleRoot) => {
  console.log(idToMerkleRoot)
  // idToMerkleRoot
  // const newCasts: { [merkleRoot: string]: Promise<Cast> } = {}
  // const newThreads: { [postId: number]: Promise<string[]> } = {}

  // for (const postId in statuses) {
  //   const status = statuses[postId]

  //   if (status === 'fetched') {
  //     newThreads[postId] = fetchThreadByPostId(postId)
  //   }
  // }

  // farcasterStore.threads = newThreads
})

export async function fetchFarcasterThread(postId: number) {
  if (typeof farcasterStore.threads[postId] !== 'undefined') return
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
}

export default farcasterStore
