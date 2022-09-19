import axios from 'axios'

export default function (error: unknown) {
  return error instanceof Error || axios.isAxiosError(error)
    ? error.message
    : error
}
