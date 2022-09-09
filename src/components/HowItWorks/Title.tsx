import { HeaderText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'

export default function () {
  return (
    <>
      <div className={displayTo('xs')}>
        <HeaderText center>How this works in 3 easy steps</HeaderText>
      </div>
      <div className={displayFrom('xs')}>
        <HeaderText>How this works in 3 easy steps</HeaderText>
      </div>
    </>
  )
}
