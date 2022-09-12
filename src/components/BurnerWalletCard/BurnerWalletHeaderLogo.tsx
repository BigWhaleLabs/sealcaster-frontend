import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import BurnerWalletLogo from 'icons/BurnerWalletLogo'
import classnames, { maxWidth } from 'classnames/tailwind'

const smallLogo = classnames(maxWidth('max-w-84'), displayTo('md'))

export default function () {
  return (
    <>
      <div className={displayFrom('md')}>
        <BurnerWalletLogo />
      </div>
      <div className={smallLogo}>
        <BurnerWalletLogo small />
      </div>
    </>
  )
}
