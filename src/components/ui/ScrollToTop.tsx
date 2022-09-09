import { useEffect } from 'react'
import { useLocation } from 'wouter'
import ChildrenProp from 'models/ChildrenProp'

export default ({ children }: ChildrenProp) => {
  const [location] = useLocation()
  useEffect(() => {
    const linksNeedsToScroll = ['/', '/terms', '/privacy']
    if (linksNeedsToScroll.includes(location))
      window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location])

  return <>{children}</>
}
