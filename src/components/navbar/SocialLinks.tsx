import { SocialLink } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import Discord from 'icons/Discord'
import LastDelimiter from 'components/ui/LastDelimiter'
import Twitter from 'icons/Twitter'
import classnames, { alignItems, display, space } from 'classnames/tailwind'

const socialContainer = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  space('space-x-4')
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
      <LastDelimiter />
    </div>
  )
}
