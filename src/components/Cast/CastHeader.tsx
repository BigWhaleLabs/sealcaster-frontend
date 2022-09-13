import { HeaderText, LinkText, SubHeaderText } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, {
  display,
  flexDirection,
  gap,
  width,
} from 'classnames/tailwind'

const castHeaderWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

const optionalTextWrapper = classnames(displayFrom('md'), display('md:!inline'))

export default function () {
  const farcasterEchoUrl =
    'farcaster://profiles/0xAD81Fb97FEcaFA3A9830d4e2F424aC1776024DA8/posts'

  return (
    <div className={castHeaderWrapper}>
      <HeaderText big extraLeading>
        Create your anonymous cast
      </HeaderText>
      <SubHeaderText>
        Everything will cast from{' '}
        <LinkText underline url={farcasterEchoUrl}>
          @echo
        </LinkText>{' '}
        <div className={optionalTextWrapper}>(SealCredEcho)</div> on Farcaster.
      </SubHeaderText>
    </div>
  )
}
