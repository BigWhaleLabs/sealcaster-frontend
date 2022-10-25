import { proxy } from 'valtio'

export default proxy<{
  replyToText: { [replyToId: string]: string }
  loading: boolean
  error?: unknown
}>({
  replyToText: {} as { [replyToId: string]: string },
  loading: false,
})
