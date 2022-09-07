import { BodyText, HeaderText } from 'components/Text'
import classnames, {
  alignItems,
  display,
  flexDirection,
  justifyContent,
  space,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-center'),
  alignItems('items-center'),
  space('space-y-2')
)
export default function () {
  return (
    <div className={container}>
      <HeaderText>SealCaster</HeaderText>
      <BodyText>Coming soon!</BodyText>
    </div>
  )
}
