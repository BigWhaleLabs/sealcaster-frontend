import { LinkText, PostText } from 'components/ui/Text'
import Linkify from 'react-linkify'

const componentDecorator = (href: string, text: string, key: number) => (
  <LinkText key={key} url={href}>
    {text}
  </LinkText>
)

export default function ({ text }: { text: string }) {
  return (
    <Linkify componentDecorator={componentDecorator}>
      <PostText>{text}</PostText>
    </Linkify>
  )
}
