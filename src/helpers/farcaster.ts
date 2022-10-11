import axios from 'axios'
import env from 'helpers/env'

const baseURL = `https://api.farcaster.xyz`

export type Cast = {
  threadMerkleRoot: string
  merkleRoot: string
  sequence: number
  body: {
    publishedAt: number
    username: string
    address: string
    data: {
      text: string
      replyParentMerkleRoot: string
    }
  }
}

export async function fetchAllPosts() {
  const { data } = await axios.get<{ result: { casts: Cast[] } }>(
    `${baseURL}/v1/profiles/${env.VITE_FARCASTER_PROFILE_ADDRESS}/casts`
  )
  return data.result.casts
}

export async function fetchThreadById(threadId: string) {
  const { data } = await axios.get<{ result: Cast[] }>(
    `${baseURL}/indexer/threads/${threadId}?viewer_address=${env.VITE_FARCASTER_PROFILE_ADDRESS}`
  )
  return data.result
}
