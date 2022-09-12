import { AccentText, BodyText, HeaderText } from 'components/ui/Text'
import { toast } from 'react-toastify'
import { useState } from 'preact/hooks'
import BurnerWalletDivider from 'icons/BurnerWalletDivider'
import BurnerWalletHeaderLogo from 'components/BurnerWalletCard/BurnerWalletHeaderLogo'
import Button from 'components/ui/Button'
import CardContainer from 'components/BurnerWalletCard/CardContainer'
import ColorfulEye from 'icons/ColorfulEye'
import Copy from 'icons/Copy'
import CreateFirstCastButton from 'components/BurnerWalletCard/CreateFirstCastButton'
import classnames, {
  alignItems,
  blur,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  transitionProperty,
  userSelect,
  width,
  wordBreak,
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
  gap('gap-x-1', 'xs:gap-x-2')
)
const privateKeyBlur = (closed?: boolean) =>
  classnames(
    userSelect({ 'select-none': closed }),
    blur({ 'blur-sm': closed }),
    transitionProperty('transition-all')
  )

export default function () {
  const [isKeyClosed, setKeyClosed] = useState(true)
  const [privateKey] = useState(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  )

  return (
    <CardContainer>
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
            <Button
              small
              gradientFont
              type="tertiary"
              onClick={() => setKeyClosed(!isKeyClosed)}
            >
              <div className={buttonContent}>
                <ColorfulEye open={isKeyClosed} />{' '}
                {isKeyClosed ? 'Reveal key' : 'Hide key'}
              </div>
            </Button>
            <Button
              small
              gradientFont
              type="tertiary"
              onClick={async () => {
                await navigator.clipboard.writeText(privateKey)
                toast('Private key copied 🎉')
              }}
            >
              <div className={buttonContent}>
                <Copy /> Copy key
              </div>
            </Button>
          </div>
        </div>
        <BodyText center primary semiBold>
          <AccentText color="text-accent">Save this key—seriously</AccentText>.
          Otherwise, you’ll lose it to the endless digital void where no wallets
          return from. This wallet is generated locally, so we will never know
          this key, and it won’t be saved if you leave this page—kinda sad if
          you think about it.
        </BodyText>
        <CreateFirstCastButton />
        <BurnerWalletDivider />
      </div>
    </CardContainer>
  )
}
