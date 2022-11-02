import { BaseLocationHook } from 'wouter'
import { useCallback, useEffect, useState } from 'preact/hooks'

const currentLocation = () => window.location.hash.replace(/^#/, '') || '/'

const useHashLocation = () => {
  const [location, setLocation] = useState(currentLocation())

  useEffect(() => {
    const handler = () => setLocation(currentLocation())

    window.addEventListener('hashchange', handler)
    window.addEventListener('popstate', handler)
    return () => {
      window.removeEventListener('hashchange', handler)
      window.removeEventListener('popstate', handler)
    }
  }, [])

  const navigate = useCallback((to: string) => (window.location.hash = to), [])
  return [location, navigate]
}

export default useHashLocation as BaseLocationHook
