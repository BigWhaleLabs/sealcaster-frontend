import { useState } from 'preact/hooks'

export default function <T>(entries: T[], limit: number) {
  const [skip, setSkip] = useState<number>(0)

  return {
    paginated: entries.slice(0, skip + limit),
    setSkip,
    skip,
  }
}
