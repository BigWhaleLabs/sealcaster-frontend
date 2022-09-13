import { HeaderText, LinkText, SubHeaderText } from 'components/ui/Text'
import { displayFrom } from 'helpers/visibilityClassnames'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'
import env from 'helpers/env'

const castHeaderWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

const optionalTextWrapper = classnames(displayFrom('md'), display('md:!inline'))

export default function () {
  return (
    <div className={castHeaderWrapper}>
      <HeaderText big extraLeading>
        Create your anonymous cast
      </HeaderText>
      <SubHeaderText>
        Everything will cast from{' '}
        <LinkText underline url={env.VITE_FARCASTER_PROFILE_URL}>
          @echo
        </LinkText>{' '}
        <div className={optionalTextWrapper}>(SealCredEcho)</div> on Farcaster.
      </SubHeaderText>
    </div>
  )
}
