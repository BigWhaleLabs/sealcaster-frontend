import { useEffect } from 'preact/hooks'

export default function (callback: () => void) {
  useEffect(() => {
    document.addEventListener('scroll', callback)
    return () => document.removeEventListener('scroll', callback)
  }, [callback])
}
