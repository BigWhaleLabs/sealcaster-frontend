import { FooterLink } from 'components/ui/Text'
import FooterLogo from 'icons/FooterLogo'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const footerLogo = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  flexDirection('flex-row'),
  space('space-x-4')
)

export default function ({ content, url }: { url: string; content?: string }) {
  const BlogButton = () => (
    <div className={footerLogo}>
      <FooterLogo />
      <span>Blog</span>
    </div>
  )
  return (
    <FooterLink internal={!!content} url={url}>
      {content || <BlogButton />}
    </FooterLink>
  )
}
