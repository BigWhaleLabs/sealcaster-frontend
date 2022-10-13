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
  maxWidth,
  padding,
  position,
  textColor,
  width,
  zIndex,
} from 'classnames/tailwind'

const backgroundWrapper = classnames(
  backgroundColor('bg-primary-dimmed'),
  padding('p-6'),
  display('flex'),
  borderRadius('rounded-lg'),
  maxWidth('max-w-full', 'lg:max-w-body'),
  width('w-full', 'md:w-body'),
  dropShadow('drop-shadow-info-card')
)

const buttonsWrapper = classnames(
  display('flex'),
  alignItems('items-center'),
  margin('mt-4'),
  gap('gap-x-4')
)

const positionWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  width('w-full')
)

const headerTextWrapper = (show: boolean) =>
  classnames(
    display('flex'),
    gap('gap-x-1'),
    justifyContent('justify-between'),
    alignItems(
      show ? { 'items-center': true, 'md:items-start': true } : 'items-start'
    )
  )

const contentWrapper = classnames(
  position('fixed'),
  inset('left-0', 'lg:left-9', 'bottom-9'),
  zIndex('z-50'),
  padding('p-3')
)

const infoSealWrapper = classnames(
  displayFrom('md'),
  margin('mr-4'),
  dropShadow('drop-shadow-info-seal')
)

const headerContainerWrapper = classnames(display('flex'), gap('gap-x-1'))

const smallInfoSealWrapepr = classnames(
  displayTo('md'),
  dropShadow('drop-shadow-info-seal')
)

const arrowWrapper = classnames(width('w-4'), margin('mt-2'))

const positionWithGap = classnames(positionWrapper, gap('gap-y-1'))

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
          <div className={positionWithGap}>
            <div className={headerTextWrapper(show)}>
              <span className={headerContainerWrapper}>
                <div className={smallInfoSealWrapepr}>
                  <SmallInfoSeal />
                </div>
                <AccentText color="text-formal-accent" large bold>
                  {showAttention && (
                    <span className={textColor('text-secondary')}>
                      Attention:{' '}
                    </span>
                  )}
                  {headerText}
                </AccentText>
              </span>
              <Button
                center
                type="tertiary"
                onClick={() => {
                  setShow(!show)
                }}
              >
                <div className={arrowWrapper}>
                  <span className={displayTo('md')}>
                    <Arrow pulseDisabled open={show} />
                  </span>
                  <span className={displayFrom('md')}>
                    <Arrow pulseDisabled open={!show} />
                  </span>
                </div>
              </Button>
            </div>
            {show && <StatusText>{mainText}</StatusText>}
          </div>
          <div className={displayFrom('md')}>{buttons}</div>
          <div className={displayTo('md')}>{show && buttons}</div>
        </div>
      </div>
    </div>
  )
}
