import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Logo from 'components/navbar/Logo'
import SealVerse from 'components/navbar/SealVerse'
import SocialLinks from 'components/navbar/SocialLinks'
import classnames, {
  alignItems,
  backgroundColor,
  borderWidth,
  cursor,
  display,
  flexDirection,
  gap,
  height,
  lineHeight,
  textAlign,
  width,
} from 'classnames/tailwind'

const walletContainer = classnames(
  display('flex'),
  flexDirection('flex-col-reverse', 'xs:flex-row'),
  alignItems('items-center'),
  gap('gap-x-3', 'sm:gap-x-4'),
  cursor('cursor-pointer')
)
const delimiterContainer = classnames(
  borderWidth('border-0'),
  backgroundColor('bg-primary-dimmed'),
  width('w-px'),
  height('h-4')
)
const lastDelimiterContainer = classnames(delimiterContainer, displayFrom('xs'))

const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

export default function () {
  return (
    <div className={walletContainer}>
      <SocialLinks />
      <SealVerse />
      <hr className={lastDelimiterContainer} />

      <div className={walletAccount}>
        <AccentText small color="text-primary-semi-dimmed">
          <span className={displayTo('lg')}>Fetching...</span>
          <span className={displayFrom('lg')}>Fetching wallet...</span>
        </AccentText>
      </div>
      <div className={width('w-fit')}>
        <Logo connected={false} />
      </div>
    </div>
  )
}
