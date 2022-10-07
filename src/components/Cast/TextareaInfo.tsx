import { AccentText } from 'components/ui/Text'
import { JSX } from 'preact/jsx-runtime'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Button from 'components/ui/Button'
import ErrorMessage from 'components/ui/ErrorMessage'
import HowItWorks from 'components/HowItWorks'
import classnames, {
  alignItems,
  display,
  flexDirection,
  fontSize,
  gap,
  justifyContent,
  width,
} from 'classnames/tailwind'

const hintWrapper = classnames(
  display('inline-flex'),
  alignItems('items-center'),
  gap('gap-x-1'),
  fontSize('text-xs')
)

const textAreaInfoWrapper = classnames(
  display('flex'),
  justifyContent('justify-between'),
  flexDirection('flex-col', 'md:flex-row'),
  alignItems('md:items-center'),
  gap('gap-y-4', 'md:gap-y-0')
)

export default function ({
  error,
  loading,
  disabled,
  onButtonClick,
  leftBlock,
  rightBlock,
}: {
  error?: string
  loading?: boolean
  disabled?: boolean
  onButtonClick?: () => void
  leftBlock?: JSX.Element | string
  rightBlock?: JSX.Element | string
}) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <div className={textAreaInfoWrapper}>
        {leftBlock ? (
          leftBlock
        ) : (
          <>
            <AccentText extraSmall color="text-accent">
              <span
                className={hintWrapper}
                onClick={() => setExpanded(!expanded)}
              >
                How is it done anonymously?{' '}
                <div className={width('w-4')}>
                  <Arrow pulseDisabled open={expanded} />
                </div>
              </span>
            </AccentText>
          </>
        )}

        {rightBlock ? (
          rightBlock
        ) : (
          <>
            <Button
              loading={loading}
              center
              small
              type="primary"
              disabled={disabled}
              onClick={onButtonClick}
            >
              Cast anonymously
            </Button>
            {!!error && <ErrorMessage small centered text={error} />}
          </>
        )}
      </div>
      {expanded && <HowItWorks />}
    </>
  )
}
