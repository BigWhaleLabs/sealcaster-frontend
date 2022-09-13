import { HeaderText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'

export default function ({ hasWallet }: { hasWallet?: boolean }) {
  const title = hasWallet
    ? 'How does this work?'
    : 'How this works in 3 easy steps'
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
