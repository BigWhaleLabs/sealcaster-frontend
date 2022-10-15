import { AccentText } from 'components/ui/Text'
import { JSX } from 'preact/jsx-runtime'
import { truncateMiddleIfNeeded } from '@big-whale-labs/frontend-utils'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Button from 'components/ui/Button'
import ErrorMessage from 'components/ui/ErrorMessage'
import HowItWorks from 'components/HowItWorks'
import classnames, {
  alignItems,
  cursor,
  display,
  flexDirection,
  fontFamily,
  fontSize,
  gap,
  justifyContent,
  width,
} from 'classnames/tailwind'
import walletStore from 'stores/WalletStore'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1'),
  fontSize('text-xs'),
  cursor('cursor-pointer')
)

const textAreaInfoWrapper = (customBlock?: boolean) =>
  classnames(
    display('flex'),
    justifyContent('justify-between'),
    flexDirection(customBlock ? 'flex-col' : 'flex-col-reverse', 'md:flex-row'),
    alignItems('items-center'),
    gap('gap-y-4', 'md:gap-y-0')
  )

export default function ({
  error,
  loading,
  disabled,
  onButtonClick,
  leftBlock,
  buttonText,
}: {
  error?: string
  loading?: boolean
  disabled?: boolean
  onButtonClick?: () => void
  leftBlock?: JSX.Element | string
  buttonText?: string
}) {
  const [expanded, setExpanded] = useState(false)

  const { account } = useSnapshot(walletStore)

  return (
    <>
      <div className={textAreaInfoWrapper(!!leftBlock)}>
        {leftBlock ? (
          leftBlock
        ) : (
          <>
            <AccentText extraSmall color="text-accent">
              {account ? (
                <span className={fontFamily('font-primary')}>
                  Posting from: {truncateMiddleIfNeeded(account, 12)}
                </span>
              ) : (
                <span
                  className={hintWrapper}
                  onClick={() => setExpanded(!expanded)}
                >
                  How is it done anonymously?{' '}
                  <div className={width('w-4')}>
                    <Arrow pulseDisabled open={expanded} />
                  </div>
                </span>
              )}
            </AccentText>
          </>
        )}

        <>
          <Button
            loading={loading}
            center
            small
            fullWidthOnMobile
            type="primary"
            disabled={disabled}
            onClick={onButtonClick}
          >
            {buttonText ? buttonText : 'Cast anonymously'}
          </Button>
          {!!error && <ErrorMessage small centered text={error} />}
        </>
      </div>
      {expanded && <HowItWorks />}
    </>
  )
}
