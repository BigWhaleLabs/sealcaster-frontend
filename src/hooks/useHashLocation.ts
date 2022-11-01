import { BaseLocationHook } from 'wouter'
import { useCallback, useEffect, useState } from 'preact/hooks'

const currentLocation = () => {
  return window.location.hash.replace(/^#/, '') || '/'
}

const useHashLocation: BaseLocationHook = () => {
  const [location, setLocation] = useState(currentLocation())

  useEffect(() => {
    const handler = () => setLocation(currentLocation())

    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = useCallback((to: string) => (window.location.hash = to), [])
  return [location, navigate]
}

export default useHashLocation
