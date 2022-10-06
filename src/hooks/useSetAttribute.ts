import { useEffect } from 'preact/hooks'

export default function (name: string, value: string) {
  useEffect(() => {
    document.getElementsByTagName('html')[0].setAttribute(name, value)

    return () => {
      document.getElementsByTagName('html')[0].setAttribute(name, '')
    }
  })
}
