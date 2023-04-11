import { proxy } from 'valtio'

export default proxy<{
  replyToText: { [replyToId: string]: string }
  loading: { [replyToId: string]: boolean }
  error: { [replyToId: string]: unknown }
}>({
  error: {},
  loading: {},
  replyToText: {} as { [replyToId: string]: string },
})
