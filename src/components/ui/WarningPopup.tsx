import { LargeText, LinkText, StatusText } from 'components/ui/Text' //LargeText
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Button from 'components/ui/Button'
import Card from 'components/ui/Card'
import GradientBorder from 'components/ui/GradientBorder'
import SealLogo from 'icons/SealLogo'
import classnames, {
  alignItems,
  backgroundColor,
  borderRadius,
  display,
  flexDirection,
  gap,
  height,
  inset,
  justifyContent,
  margin,
  maxWidth,
  opacity,
  padding,
  position,
  textAlign,
  width,
  zIndex,
} from 'classnames/tailwind'

const container = classnames(
  position('absolute'),
  display('flex'),
  justifyContent('justify-center'),
  inset('inset-0'),
  padding('py-1.5'),
  zIndex('z-30')
)
const overlay = classnames(
  position('absolute'),
  inset('inset-0'),
  backgroundColor('bg-primary-dark'),
  opacity('opacity-50'),
  borderRadius('rounded-2xl')
)
const cardContainer = classnames(
  display('flex'),
  alignItems('items-center'),
  justifyContent('justify-center'),
  height('h-screen'),
  width('xs:w-full'),
  maxWidth('max-w-fit', 'body:max-w-body'),
  margin('mx-4', 'mb-auto', 'body:mx-auto')
)
const warningCard = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-4')
)
const warningCardBottom = classnames(
  display('flex'),
  alignItems('items-center'),
  flexDirection('flex-col', 'sm:flex-row'),
  gap('gap-y-4', 'sm:gap-x-4', 'sm:gap-y-0')
)

export default function ({
  onAccept,
  onReject,
}: {
  onAccept: () => void
  onReject: () => void
}) {
  const { privateKey } = useSnapshot(BurnerWalletStore)

  return (
    <div className={container}>
      <div className={overlay} />
      <div className={cardContainer}>
        <Card>
          <div className={warningCard}>
            <SealLogo />
            <LargeText>
              Are you sure you want to trash the burner wallet? You cannot undo
              this action
            </LargeText>
            {!!privateKey && (
              <div className={textAlign('text-center')}>
                <StatusText primary color="tertiary">
                  You may copy your private key in{' '}
                  <LinkText internal url="/wallet">
                    Wallet
                  </LinkText>
                </StatusText>
              </div>
            )}
            <div className={warningCardBottom}>
              <GradientBorder>
                <Button small gradientFont type="secondary" onClick={onReject}>
                  I'm not sure
                </Button>
              </GradientBorder>
              <Button small type="primary" onClick={onAccept}>
                Yes, I'm sure
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
