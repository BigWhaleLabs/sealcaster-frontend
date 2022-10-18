import { proxy } from 'valtio'

export default proxy<{
  text: string
  waitBurner: boolean
  loading: boolean
  error?: unknown
}>({
  text: '',
  waitBurner: false,
  loading: false,
})
