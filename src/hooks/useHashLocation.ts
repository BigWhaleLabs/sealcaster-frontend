import { BaseLocationHook } from 'wouter'
import { useEffect, useState } from 'preact/hooks'

// returns the current hash location in a normalized form
const currentLocation = () => {
  return window.location.hash.replace(/^#/, '') || '/'
}

const navigate = (to: string) => (window.location.hash = to)

const useHashLocation: BaseLocationHook = () => {
  const [loc, setLoc] = useState(currentLocation())

  useEffect(() => {
    const handler = () => setLoc(currentLocation())

    // subscribe to hash changes
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  return [loc, navigate]
}

export default useHashLocation
