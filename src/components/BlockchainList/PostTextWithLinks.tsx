import Linkify from 'react-linkify'
import { LinkText, PostText } from "components/ui/Text";

const componentDecorator = (href: string, text: string, key: number) => (
  <LinkText url={href} key={key}>{text}</LinkText>
)

export default function ({ text }: { text: string }) {
  return (
    <Linkify componentDecorator={componentDecorator}>
      <PostText>{text}</PostText>
    </Linkify>
  )
}