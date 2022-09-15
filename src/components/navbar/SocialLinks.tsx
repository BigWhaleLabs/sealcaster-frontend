import { SocialLink } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import Discord from 'icons/Discord'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  display,
  height,
  space,
  width,
} from 'classnames/tailwind'

const socialContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4')
)
const delimiterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)
const socialLinksContainer = classnames(socialContainer, displayFrom('lg'))

export default function () {
  return (
    <div className={socialLinksContainer}>
      <SocialLink url="https://discord.gg/NHk96pPZUV">
        <Discord />
      </SocialLink>
      <SocialLink url="https://twitter.com/bigwhalelabs">
        <Twitter />
      </SocialLink>
      <hr className={delimiterContainer} />
    </div>
  )
}
