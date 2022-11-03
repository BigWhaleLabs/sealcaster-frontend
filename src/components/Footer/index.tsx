import { SocialLink } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Delimiter from 'components/ui/Delimiter'
import Discord from 'icons/Discord'
import FooterButton from 'components/Footer/FooterButton'
import FooterOptions from 'components/Footer/FooterOptions'
import Twitter from 'icons/Twitter'
import classnames, {
  alignItems,
  display,
  flex,
  flexDirection,
  justifyContent,
  padding,
  space,
} from 'classnames/tailwind'

const commonClasses = classnames(display('flex'), alignItems('items-center'))
const socialContainerCard = classnames(
  commonClasses,
  flex('flex-1'),
  alignItems('md:items-end'),
  justifyContent('justify-end', 'md:justify-start'),
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
              url={`#${FooterOptions[key].url}`}
              content={FooterOptions[key].text}
            />
            {linkList.length - 1 !== index && (
              <div className={displayFrom('md')}>
                <Delimiter />
              </div>
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
