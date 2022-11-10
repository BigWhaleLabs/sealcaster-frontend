import useHashLocation from 'hooks/useHashLocation'

export default function (url: string) {
  const [location] = useHashLocation()
  return location === url.replace(/^#/, '')
}
