import { HeaderText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'

export default function ({ hasBurnerWallet }: { hasBurnerWallet?: boolean }) {
  const title = hasBurnerWallet
    ? 'How does this work?'
    : 'How this works in 2 easy steps'
  return (
    <>
      <div className={displayTo('xs')}>
        <HeaderText center>{title}</HeaderText>
      </div>
      <div className={displayFrom('xs')}>
        <HeaderText>{title}</HeaderText>
      </div>
    </>
  )
}
