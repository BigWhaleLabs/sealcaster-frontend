import axios from 'axios'

export default function (error: unknown) {
  // we need to cast type to get real axios error message
  if (axios.isAxiosError(error) && error.response?.data) {
    return (error.response.data as { [key: string]: unknown }).message ?? error
  }
  if (error instanceof Error) return error.message

  return error
}
