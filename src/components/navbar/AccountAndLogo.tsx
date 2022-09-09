import Account from 'components/navbar/Account'
import Logo from 'components/navbar/Logo'
import classnames, { lineHeight, textAlign, width } from 'classnames/tailwind'

const walletAccount = classnames(
  textAlign('text-right'),
  lineHeight('leading-5')
)

export default function ({
  account,
  connected,
  needNetworkChange,
  eNSName,
  noWalletText,
}: {
  account?: string
  needNetworkChange: boolean
  connected: boolean
  eNSName?: string
  noWalletText?: string
}) {
  return (
    <>
      <div className={walletAccount}>
        <Account
          eNSName={eNSName}
          account={account}
          needNetworkChange={needNetworkChange}
          noWalletText={noWalletText}
        />
      </div>
      <div className={width('w-fit')}>
        <Logo connected={connected} />
      </div>
    </>
  )
}
