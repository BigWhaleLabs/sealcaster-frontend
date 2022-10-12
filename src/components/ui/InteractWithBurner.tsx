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
  flexDirection('flex-row'),
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
    flexDirection('flex-row'),
    gap('gap-x-1'),
    justifyContent('justify-between'),
    alignItems(show ? 'items-start' : 'items-center')
  )

const contentWrapper = classnames(
  position('fixed'),
  inset('right-0', 'lg:right-9', 'bottom-9'),
  zIndex('z-50'),
  padding('p-3')
)

const infoSealWrapper = classnames(
  displayFrom('md'),
  margin('mr-4'),
  dropShadow('drop-shadow-info-seal')
)

const ActionsButtons = ({
  primaryButtonText,
  primaryButtonAction,
  tertiaryButtonText,
  tertiaryButtonAction,
}: {
  primaryButtonText?: string
  tertiaryButtonText?: string
  primaryButtonAction?: () => void
  tertiaryButtonAction?: () => void
}) => {
  return (
    <div className={buttonsWrapper}>
      {primaryButtonText && (
        <Button small type="primary" onClick={primaryButtonAction}>
          {primaryButtonText}
        </Button>
      )}
      <Button type="tertiary" gradientFont small onClick={tertiaryButtonAction}>
        {tertiaryButtonText}
      </Button>
    </div>
  )
}

export default function ({
  showAttention,
  mainText,
  headerText,
  primaryButtonText,
  tertiaryButtonText,
  primaryButtonAction,
  tertiaryButtonAction,
  sadSeal,
}: {
  mainText: string
  headerText: string
  primaryButtonText?: string
  tertiaryButtonText?: string
  primaryButtonAction?: () => void
  tertiaryButtonAction?: () => void
  sadSeal?: boolean
  showAttention?: boolean
}) {
  const [show, setShow] = useState(false)

  function renderButtons() {
    return (
      <ActionsButtons
        primaryButtonText={primaryButtonText}
        tertiaryButtonText={tertiaryButtonText}
        primaryButtonAction={primaryButtonAction}
        tertiaryButtonAction={tertiaryButtonAction}
      />
    )
  }

  return (
    <div className={contentWrapper}>
      <div className={backgroundWrapper}>
        <div>
          <div className={infoSealWrapper}>
            <InfoSeal sadSeal={sadSeal} />
          </div>
        </div>
        <div className={positionWrapper}>
          <div className={classnames(positionWrapper, gap('gap-y-1'))}>
            <div className={headerTextWrapper(show)}>
              <span className={classnames(display('flex'), gap('gap-x-1'))}>
                <div
                  className={classnames(
                    displayTo('md'),
                    dropShadow('drop-shadow-info-seal')
                  )}
                >
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
                type="tertiary"
                onClick={() => {
                  setShow(!show)
                }}
              >
                <div className={width('w-4')}>
                  <Arrow pulseDisabled open={show} />
                </div>
              </Button>
            </div>
            {show && <StatusText>{mainText}</StatusText>}
          </div>
          <div className={displayFrom('md')}>{renderButtons()}</div>
          <div className={displayTo('md')}>{show && renderButtons()}</div>
        </div>
      </div>
    </div>
  )
}
