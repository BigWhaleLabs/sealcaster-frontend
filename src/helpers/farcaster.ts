import { Cast } from 'models/Cast'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_POSTER_URL}`

export default async function fetchThreadById(threadId: string) {
  const { data } = await axios.get<{ result: Cast[] }>(
    `${baseURL}/farcaster/${env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS}/${threadId}`
  )
  return data
}
