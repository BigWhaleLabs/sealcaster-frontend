import { AccentText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Logo from 'components/navbar/Logo'
import classnames, { lineHeight, textAlign, width } from 'classnames/tailwind'

const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

export default function () {
  return (
    <>
      <div className={walletAccount}>
        <AccentText small color="text-primary-semi-dimmed">
          <span className={displayTo('lg')}>Fetching...</span>
          <span className={displayFrom('lg')}>Fetching account...</span>
        </AccentText>
      </div>
      <div className={width('w-fit')}>
        <Logo connected={false} />
      </div>
    </>
  )
}
