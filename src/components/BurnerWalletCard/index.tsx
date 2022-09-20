import { AccentText, BodyText, HeaderText } from 'components/ui/Text'
import { toast } from 'react-toastify'
import { useState } from 'preact/hooks'
import BurnerWalletDivider from 'icons/BurnerWalletDivider'
import BurnerWalletHeaderLogo from 'components/BurnerWalletCard/BurnerWalletHeaderLogo'
import Button from 'components/ui/Button'
import ColorfulEye from 'icons/ColorfulEye'
import Copy from 'icons/Copy'
import CreateFirstCastButton from 'components/BurnerWalletCard/CreateFirstCastButton'
import MagicCardWrapper from 'components/ui/MagicCardWrapper'
import classnames, {
  alignItems,
  backgroundColor,
  blur,
  borderRadius,
  cursor,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  transitionProperty,
  userSelect,
  width,
  wordBreak,
  zIndex,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-6', 'xs:gap-y-10'),
  width('w-full')
)

const privateContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  padding('p-0', 'xs:p-2.5')
)
const privateKeyText = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-1'),
  wordBreak('break-all')
)
const buttonsContainer = (closed?: boolean) =>
  classnames(
    display('flex'),
    flexDirection('flex-row'),
    justifyContent('justify-center'),
    gap(closed ? 'gap-x-2' : 'gap-x-6', closed ? 'xs:gap-x-4' : 'xs:gap-x-8')
  )
const buttonContent = classnames(
  display('flex'),
  flexDirection('flex-row'),
  alignItems('items-center'),
  gap('gap-x-1', 'xs:gap-x-2'),
  cursor('cursor-pointer')
)
const privateKeyBlur = (closed?: boolean) =>
  classnames(
    userSelect({ 'select-none': closed }),
    blur({ 'blur-sm': closed }),
    transitionProperty('transition-all')
  )
const cardContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  alignItems('items-center'),
  borderRadius('rounded-2xl'),
  wordBreak('break-words'),
  zIndex('z-20'),
  backgroundColor('bg-primary-background'),
  padding('py-6', 'px-6', 'xs:py-10')
)

export default function ({ privateKey }: { privateKey: string }) {
  const [isKeyClosed, setKeyClosed] = useState(true)

  return (
    <MagicCardWrapper>
      <div className={cardContainer}>
        <BurnerWalletHeaderLogo />
        <div className={container}>
          <HeaderText center>Your new wallet:</HeaderText>
          <div className={privateContainer}>
            <div className={privateKeyText}>
              <BodyText center semiBold>
                Private key
              </BodyText>
              <div className={privateKeyBlur(isKeyClosed)}>
                <AccentText color="text-secondary">
                  <BodyText center semiBold inheritColor>
                    {privateKey}
                  </BodyText>
                </AccentText>
              </div>
            </div>
            <div className={buttonsContainer(isKeyClosed)}>
              <div
                className={buttonContent}
                onClick={() => setKeyClosed(!isKeyClosed)}
              >
                <ColorfulEye open={isKeyClosed} />
                <Button small gradientFont type="tertiary">
                  {isKeyClosed ? 'Reveal key' : 'Hide key'}
                </Button>
              </div>
              <div
                className={buttonContent}
                onClick={async () => {
                  await navigator.clipboard.writeText(privateKey)
                  toast('Private key copied 🎉')
                }}
              >
                <Copy />
                <Button small gradientFont type="tertiary">
                  Copy key
                </Button>
              </div>
            </div>
          </div>
          <BodyText center primary semiBold>
            <AccentText color="text-accent">
              Save this key — seriously
            </AccentText>
            . Otherwise, you’ll lose it to the endless digital void where no
            wallets return from. This wallet is generated locally, so we will
            never know this key. However, unless you clean the website data,
            this key will persist between page reloads in your browser.
          </BodyText>
          <CreateFirstCastButton />
          <BurnerWalletDivider />
        </div>
      </div>
    </MagicCardWrapper>
  )
}
