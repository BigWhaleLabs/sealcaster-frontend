import { Cast } from 'models/Cast'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_POSTER_URL}`

type FarcasterResponse = { merkleRoot?: string; casts: Cast[] }

export default async function fetchThreadByPostId(postId: number) {
  try {
    const { data } = await axios.get<FarcasterResponse>(
      `${baseURL}/farcaster/${env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS}/${postId}`
    )

    return data
  } catch (e) {
    console.error(e)
  }

  return { casts: [] } as FarcasterResponse
}
