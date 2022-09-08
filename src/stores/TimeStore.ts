import { proxy } from 'valtio'

const TimeStore = proxy({
  current: new Date().valueOf(),
})

setInterval(() => (TimeStore.current = new Date().valueOf()), 10000)

export default TimeStore
