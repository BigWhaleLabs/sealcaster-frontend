import { Cast } from 'models/Cast'
import { proxy } from 'valtio'
import fetchThreadById from 'helpers/farcaster'

const farcasterStore = proxy<{
  casts: { [merkleRoot: string]: Promise<Cast> }
  threads: { [threadId: string]: Promise<string[]> }
}>({
  casts: {},
  threads: {},
})

export function fetchFarcasterThread(threadId: string) {
  if (typeof farcasterStore.threads[threadId] !== 'undefined') return
  const request = fetchThreadById(threadId)
  farcasterStore.threads[threadId] = request.then((casts) =>
    casts.map((cast) => cast.merkleRoot)
  )
  void request.then((casts) => {
    for (const cast of casts) {
      farcasterStore.casts[cast.merkleRoot] = Promise.resolve(cast)
    }
  })
}

export default farcasterStore
