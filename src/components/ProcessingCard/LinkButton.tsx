import { LinkText } from 'components/ui/Text'
import { useLocation } from 'wouter'
import Button from 'components/ui/Button'

interface LinkButtonProps {
  url: string
  internal?: boolean
  approved?: boolean
  cleanQuery?: boolean
}

export default function ({
  url,
  internal,
  approved,
  cleanQuery = true,
}: LinkButtonProps) {
  const [location, setLocation] = useLocation()
  const linkTitle = approved
    ? 'View cast on Farcaster'
    : 'View cast on Sealcaster'

  return (
    <LinkText
      url={url}
      title={linkTitle}
      internal={internal}
      gradientFrom="from-secondary"
      gradientTo="to-accent"
      anchor
    >
      <Button
        small
        withArrow
        gradientFont
        type="tertiary"
        onClick={() => {
          if (cleanQuery) setLocation(location.split('#')[0])
        }}
      >
        {linkTitle}
      </Button>
    </LinkText>
  )
}
