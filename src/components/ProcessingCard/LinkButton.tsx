import { scrollToHashElement } from 'hooks/useScrollToAnchor'
import { useLocation } from 'wouter'
import Button from 'components/ui/Button'

interface LinkButtonProps {
  url: string
  approved?: boolean
}

export default function ({ approved, url }: LinkButtonProps) {
  const [, setLocation] = useLocation()

  const linkTitle = approved
    ? 'View cast on Farcaster'
    : 'View cast on Sealcaster'

  return (
    <Button
      gradientFont
      small
      withArrow
      type="tertiary"
      onClick={() => {
        setLocation(url)
        scrollToHashElement()
      }}
    >
      {linkTitle}
    </Button>
  )
}
