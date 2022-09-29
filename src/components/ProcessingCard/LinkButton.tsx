import { LinkText } from 'components/ui/Text'
import { scrollToHashElement } from 'hooks/useScrollToAnchor'
import Button from 'components/ui/Button'

interface LinkButtonProps {
  url: string
  internal?: boolean
  approved?: boolean
}

export default function ({ url, internal, approved }: LinkButtonProps) {
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
        onClick={() => scrollToHashElement()}
      >
        {linkTitle}
      </Button>
    </LinkText>
  )
}
