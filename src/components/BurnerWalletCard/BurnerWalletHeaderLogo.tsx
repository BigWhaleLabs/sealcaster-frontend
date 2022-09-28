import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import BurnerWalletLogo from 'icons/BurnerWalletLogo'
import BurnerWalletSeal from 'icons/BurnerWalletSeal'

export default function () {
  return (
    <>
      <div className={displayFrom('md')}>
        <BurnerWalletLogo />
      </div>
      <div className={displayTo('md')}>
        <div className={displayTo('xs')}>
          <BurnerWalletSeal />
        </div>
        <div className={displayFrom('xs')}>
          <BurnerWalletLogo small />
        </div>
      </div>
    </>
  )
}
