import { AccentText, HeaderText, PostText } from 'components/Text'
import { Sizes } from 'models/CharInCircle'
import { useState } from 'preact/hooks'
import Button from 'components/ui/Button'
import CharInCircle from 'components/ui/CharInCircle'
import TextInput from 'components/ui/TextInput'
import Tooltip from 'components/ui/Tooltip'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  textAlign,
  width,
} from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
)
const topPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)
const bottomPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  justifyContent('justify-start'),
  gap('gap-y-6')
)

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1.5')
)
const buttonWithStatus = classnames(
  display('flex'),
  flexDirection('flex-col', 'sm:flex-row'),
  alignItems('items-center'),
  textAlign('text-center', 'sm:text-left'),
  gap('gap-y-4', 'sm:gap-x-4')
)
const buttonClass = classnames(display('block'), width('w-full', 'sm:w-64'))

export default function () {
  const [username, setUsername] = useState('whets')
  const [hasError, setHasError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState('Obtaining token from attestor...')

  const hintText =
    'You can see what eth address you have connected to Farcaster in profile settings.'

  return (
    <div className={wrapper}>
      <div className={topPart}>
        <HeaderText>
          Now let’s verify that you have a Farcaster profile
        </HeaderText>
        <PostText>
          We’ll need to match your Farcaster username with the wallet you
          connected to your Farcaster profile.{' '}
          <AccentText color="text-accent">
            <Tooltip position="bottom" text={hintText}>
              <span className={hintWrapper}>
                <CharInCircle size={Sizes.Small} char="?" />
              </span>
            </Tooltip>
          </AccentText>
        </PostText>
      </div>
      <div className={bottomPart}>
        <TextInput
          withAtSign
          value={username}
          isError={hasError}
          disabled={loading}
          onChange={(e) => setUsername((e.target as HTMLInputElement).value)}
          onKeyDown={(event) =>
            event.code === 'Enter'
              ? console.log('Enter username:', username)
              : undefined
          }
        />
        <PostText>
          You’ll verify your username and profile by connecting the same wallet
          you connected to Farcaster.
        </PostText>
        <div className={buttonWithStatus}>
          <div className={buttonClass}>
            <Button
              center
              fullWidth
              loadingOverflow
              type="primary"
              loading={loading}
              onClick={() => setLoading(true)}
            >
              Connect & verify
            </Button>
          </div>
          {status && (
            <AccentText small color="text-tertiary">
              {status}
            </AccentText>
          )}
        </div>
      </div>
    </div>
  )
}
