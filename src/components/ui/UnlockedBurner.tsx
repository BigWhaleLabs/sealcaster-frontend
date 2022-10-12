import { AccentText, StatusText } from 'components/ui/Text'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import Button from 'components/ui/Button'
import InfoSeal from 'icons/InfoSeal'
import SmallInfoSeal from 'icons/SmallInfoSeal'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  inset,
  margin,
  maxWidth,
  padding,
  position,
  textColor,
  zIndex,
} from 'classnames/tailwind'

const backgroundWrapper = classnames(
  backgroundColor('bg-primary-dimmed'),
  padding('p-6'),
  display('flex'),
  borderRadius('rounded-lg'),
  maxWidth('max-w-full', 'lg:max-w-body'),
  gap('gap-x-4')
)

const buttonsWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  margin('mt-4'),
  gap('gap-x-4')
)

const positionWrapper = classnames(display('flex'), flexDirection('flex-col'))

const headerTextWrapper = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-1')
)

const contentWrapper = classnames(
  position('fixed'),
  inset('right-0', 'lg:right-9', 'bottom-9'),
  zIndex('z-50'),
  padding('p-4')
)

export default function ({
  attentionText,
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
  attentionText?: string
  primaryButtonText?: string
  tertiaryButtonText?: string
  primaryButtonAction?: () => void
  tertiaryButtonAction?: () => void
  sadSeal?: boolean
}) {
  return (
    <div className={contentWrapper}>
      <div className={backgroundWrapper}>
        <div>
          <div className={displayFrom('md')}>
            <InfoSeal sadSeal={sadSeal} />
          </div>
        </div>
        <div className={positionWrapper}>
          <div className={classnames(positionWrapper, gap('gap-y-1'))}>
            <div className={headerTextWrapper}>
              <div className={displayTo('md')}>
                <SmallInfoSeal />
              </div>
              <AccentText color="text-formal-accent" large bold>
                <span className={textColor('text-secondary')}>
                  {attentionText}
                </span>
                {headerText}
              </AccentText>
            </div>
            <StatusText>{mainText}</StatusText>
          </div>
          <div className={buttonsWrapper}>
            {primaryButtonText && (
              <Button small type="primary" onClick={primaryButtonAction}>
                {primaryButtonText}
              </Button>
            )}
            <Button
              type="tertiary"
              gradientFont
              small
              onClick={tertiaryButtonAction}
            >
              {tertiaryButtonText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
