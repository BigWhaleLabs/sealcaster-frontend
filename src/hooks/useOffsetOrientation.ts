import { useEffect, useState } from 'preact/hooks'

export default function () {
  const [offset, setOffset] = useState(10)
  useEffect(() => {
    function handleChangeOrientation() {
      const { type } = screen.orientation
      switch (type) {
        case 'portrait-primary':
        case 'portrait-secondary':
          setOffset(10)
          break
        case 'landscape-primary':
        case 'landscape-secondary':
          setOffset(20)
          break
        default:
          setOffset(10)
      }
    }
    window.addEventListener('orientationchange', handleChangeOrientation)
    return () =>
      window.addEventListener('orientationchange', handleChangeOrientation)
  }, [offset])

  return { offset }
}
