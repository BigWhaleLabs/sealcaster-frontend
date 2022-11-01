import { BaseLocationHook } from 'wouter'
import { useEffect, useState } from 'preact/hooks'

// returns the current hash location in a normalized form
const currentLocation = () => {
  return window.location.hash.replace(/^#/, '') || '/'
}

const navigate = (to: string) => (window.location.hash = to)

const useHashLocation: BaseLocationHook = () => {
  const [location, setLocation] = useState(currentLocation())

  useEffect(() => {
    const handler = () => setLocation(currentLocation())

    // subscribe to hash changes
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return [location, navigate]
}

export default useHashLocation
