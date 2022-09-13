import { HeaderText, LinkText, SubHeaderText } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, { display, space, width } from 'classnames/tailwind'

export default function () {
  const farcasterEchoUrl =
    'farcaster://profiles/0xAD81Fb97FEcaFA3A9830d4e2F424aC1776024DA8/posts'

  return (
    <div
      className={classnames(space('space-y-4'), width('md:w-full', 'w-4/5'))}
    >
      <HeaderText big extraLeading>
        Create your anonymous cast
      </HeaderText>
      <SubHeaderText>
        Everything will cast from{' '}
        <LinkText underline url={farcasterEchoUrl}>
          @echo
        </LinkText>{' '}
        <div className={classnames(displayFrom('md'), display('md:!inline'))}>
          (SealCredEcho)
        </div>{' '}
        on Farcaster.
      </SubHeaderText>
    </div>
  )
}
