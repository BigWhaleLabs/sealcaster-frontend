import { proxy } from 'valtio'

export default proxy<{
  replyToText: { [replyToId: string]: string }
  loading: { [replyToId: string]: boolean }
  error: { [replyToId: string]: unknown }
}>({
  replyToText: {} as { [replyToId: string]: string },
  loading: {},
  error: {},
})
