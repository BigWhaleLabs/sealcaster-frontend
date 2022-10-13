import { Cast } from 'models/Cast'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_POSTER_URL}/farcaster`

export default async function fetchThreadById(threadId: string) {
  const { data } = await axios.get<{ result: Cast[] }>(
    `${baseURL}/indexer/threads/${threadId}?viewer_address=${env.VITE_FARCASTER_PROFILE_ADDRESS}`
  )
  return data.result
}
