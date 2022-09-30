import { scrollToHashElement } from 'hooks/useScrollToAnchor'
import { useLocation } from 'wouter'
import Button from 'components/ui/Button'

interface LinkButtonProps {
  url: string
  approved?: boolean
}

export default function ({ url, approved }: LinkButtonProps) {
  const [, setLocation] = useLocation()

  const linkTitle = approved
    ? 'View cast on Farcaster'
    : 'View cast on Sealcaster'

  return (
    <Button
      small
      withArrow
      gradientFont
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
