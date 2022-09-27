import { HeaderText, LinkText, SubHeaderText } from 'components/ui/Text'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'
import env from 'helpers/env'

const castHeaderWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
export default function () {
  return (
    <div className={castHeaderWrapper}>
      <HeaderText size="large" extraLeading>
        Create your anonymous cast
      </HeaderText>
      <SubHeaderText>
        Everything will cast from{' '}
        <LinkText underline url={env.VITE_FARCASTER_PROFILE_URL}>
          @sealcaster
        </LinkText>{' '}
        on Farcaster.
      </SubHeaderText>
    </div>
  )
}
