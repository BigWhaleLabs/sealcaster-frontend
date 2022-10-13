import { PostStatus } from 'models/PostStatus'
import axios from 'axios'
import env from 'helpers/env'

const baseURL = `${env.VITE_POSTER_URL}/posts`

export default async function (ids: number[]) {
  const { data } = await axios.post<
    {
      id: number
      status: PostStatus
      serviceId: string
    }[]
  >(
    `${baseURL}/${env.VITE_SC_FARCASTER_POSTS_CONTRACT_ADDRESS}/farcaster/list`,
    {
      ids,
    }
  )
  return data
}
