import { SocialLink } from 'components/Text'
import { displayTo } from 'helpers/visibilityClassnames'
import Delimiter from 'components/Delimiter'
import Discord from 'icons/Discord'
import FooterButton from 'components/FooterButton'
import FooterOptions from 'components/Footer/FooterOptions'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  display,
  flexDirection,
  padding,
  space,
} from 'classnames/tailwind'

const commonClasses = classnames(display('flex'), alignItems('items-center'))
const socialContainerCard = classnames(
  commonClasses,
  flexDirection('flex-col', 'md:flex-row'),
  padding('py-8', 'px-4', 'lg:px-25'),
  space('space-y-4', 'md:space-x-4', 'md:space-y-0')
)

const socialContainer = classnames(
  commonClasses,
  flexDirection('flex-row'),
  space('space-x-4')
)
const linkContainer = classnames(
  commonClasses,
  flexDirection('flex-col', 'md:flex-row'),
  space('space-y-2', 'md:space-y-0', 'md:space-x-4')
)
const socialLinksContainer = classnames(displayTo('md'), socialContainer)

export default function () {
  const linkList = Object.keys(FooterOptions)
  return (
    <div className={socialContainerCard}>
      <div className={linkContainer}>
        {linkList.map((key, index) => (
          <>
            <FooterButton
              url={FooterOptions[key].url}
              content={FooterOptions[key].text}
            />
            {linkList.length - 1 !== index && (
              <Delimiter color="dimmed" showFrom="md" />
            )}
          </>
        ))}
      </div>
      <div className={socialLinksContainer}>
        <SocialLink url="https://discord.gg/NHk96pPZUV">
          <Discord />
        </SocialLink>
        <Delimiter />
        <SocialLink url="https://twitter.com/bigwhalelabs">
          <Twitter />
        </SocialLink>
      </div>
    </div>
  )
}
