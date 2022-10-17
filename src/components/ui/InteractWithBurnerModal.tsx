import { AccentText, StatusText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useState } from 'preact/hooks'
import Arrow from 'icons/Arrow'
import Button from 'components/ui/Button'
import InfoSeal from 'icons/InfoSeal'
import SmallInfoSeal from 'icons/SmallInfoSeal'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  dropShadow,
  flexDirection,
  gap,
  inset,
  justifyContent,
  margin,
  padding,
  position,
  textColor,
  width,
  zIndex,
} from 'classnames/tailwind'

const contentWrapper = classnames(
  position('fixed'),
  inset('left-0', 'lg:left-9', 'bottom-9'),
  zIndex('z-50'),
  width('w-screen', 'body:w-body'),
  padding('p-3')
)

const backgroundWrapper = classnames(
  backgroundColor('bg-primary-dimmed'),
  padding('p-6'),
  display('flex'),
  borderRadius('rounded-lg'),
  dropShadow('drop-shadow-info-card')
)

const buttonsWrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  margin('mt-3'),
  gap('gap-x-4')
)

const positionWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full'),
  gap('gap-y-1')
)

const headerTextWrapper = (show: boolean) =>
  classnames(
    display('flex'),
    gap('gap-x-1'),
    justifyContent('justify-between'),
    alignItems(
      show ? { 'items-start': true, 'sm:items-center': true } : 'items-center'
    )
  )

const infoSealWrapper = classnames(
  displayFrom('md'),
  margin('mr-4'),
  dropShadow('drop-shadow-info-seal')
)

const smallInfoSealWrapper = classnames(
  displayTo('md'),
  dropShadow('drop-shadow-info-seal')
)

interface ButtonProps {
  text: string
  action: () => void
}

const ActionsButtons = ({
  tertiaryButton,
  primaryButton,
}: {
  tertiaryButton?: ButtonProps
  primaryButton?: ButtonProps
}) => {
  return (
    <div className={buttonsWrapper}>
      {primaryButton?.text && (
        <Button small type="primary" onClick={primaryButton.action}>
          {primaryButton.text}
        </Button>
      )}
      {tertiaryButton?.text && (
        <Button
          type="tertiary"
          gradientFont
          small
          onClick={tertiaryButton?.action}
        >
          {tertiaryButton?.text}
        </Button>
      )}
    </div>
  )
}

export default function ({
  showAttention,
  mainText,
  headerText,
  primaryButton,
  tertiaryButton,
  sadSeal,
}: {
  mainText: string
  headerText: string
  tertiaryButton?: ButtonProps
  primaryButton?: ButtonProps
  sadSeal?: boolean
  showAttention?: boolean
}) {
  const [show, setShow] = useState(false)

  const buttons = (
    <ActionsButtons
      primaryButton={primaryButton}
      tertiaryButton={tertiaryButton}
    />
  )

  return (
    <div className={contentWrapper}>
      <div className={backgroundWrapper}>
        <div className={infoSealWrapper}>
          <InfoSeal sadSeal={sadSeal} />
        </div>
        <div className={positionWrapper}>
          <div className={headerTextWrapper(show)}>
            <div className={smallInfoSealWrapper}>
              <SmallInfoSeal />
            </div>
            <AccentText color="text-formal-accent" large bold>
              {showAttention && (
                <span className={textColor('text-secondary')}>Attention: </span>
              )}
              {headerText}
            </AccentText>
            <Button
              center
              type="tertiary"
              onClick={() => {
                setShow(!show)
              }}
            >
              <div className={width('w-4')}>
                <Arrow pulseDisabled open={show} reversedOnMobiles />
              </div>
            </Button>
          </div>
          {show && <StatusText>{mainText}</StatusText>}
          <div className={displayFrom('md')}>{buttons}</div>
          <div className={displayTo('md')}>{show && buttons}</div>
        </div>
      </div>
    </div>
  )
}
