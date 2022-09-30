import { useMemo } from 'preact/hooks'

export default function (callback: () => void) {
  useMemo(() => {
    window.addEventListener('scroll', callback, { passive: true })
    return () => window.removeEventListener('scroll', callback)
  }, [callback])
}
