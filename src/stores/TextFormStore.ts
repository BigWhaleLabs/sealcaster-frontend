import { proxy } from 'valtio'

export default proxy<{
  text: string
  loading: boolean
  error?: unknown
}>({
  text: '',
  loading: false,
})
