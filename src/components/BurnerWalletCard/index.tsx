import { AccentText, BodyText, HeaderText } from 'components/Text'
import { useState } from 'preact/hooks'
import BurnerWalletDivider from 'icons/BurnerWalletDivider'
import BurnerWalletHeaderLogo from 'components/BurnerWalletCard/BurnerWalletHeaderLogo'
import Button from 'components/Button'
import CardContainer from 'components/BurnerWalletCard/CardContainer'
import ColorfulEye from 'icons/ColorfulEye'
import Copy from 'icons/Copy'
import CreateFirstCastButton from 'components/BurnerWalletCard/CreateFirstCastButton'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  justifyContent,
  padding,
  width,
  wordBreak,
} from 'classnames/tailwind'

const container = classnames(
  display('flex'),
  flexDirection('flex-col'),
  alignItems('items-center'),
  gap('gap-y-10'),
  width('w-full')
)

const privateContainer = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4'),
  padding('p-0', 'xs:p-2.5')
)
const privateKey = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-1'),
  wordBreak('break-all')
)
const buttonsContainer = classnames(
  display('flex'),
  flexDirection('flex-row'),
  justifyContent('justify-center'),
  gap('gap-x-4')
)
const buttonContent = classnames(
  display('flex'),
  flexDirection('flex-row'),
  gap('gap-x-1', 'xs:gap-x-2')
)

export default function () {
  const [isKeyOpen, setKeyOpen] = useState(false)

  return (
    <CardContainer>
      <BurnerWalletHeaderLogo />
      <div className={container}>
        <HeaderText center>Your new wallet:</HeaderText>
        <div className={privateContainer}>
          <div className={privateKey}>
            <BodyText center semiBold>
              Private key
            </BodyText>
            <AccentText color="text-secondary">
              <BodyText center semiBold inheritColor>
                0xb794f5ea0ba39494ce89268ce89268ce89268e89268e89268e89268e892689
              </BodyText>
            </AccentText>
          </div>
          <div className={buttonsContainer}>
            <Button
              small
              gradientFont
              type="tertiary"
              onClick={() => setKeyOpen(!isKeyOpen)}
            >
              <div className={buttonContent}>
                <ColorfulEye open={!isKeyOpen} />{' '}
                {isKeyOpen ? 'Hide key' : 'Reveal key'}
              </div>
            </Button>
            <Button small gradientFont type="tertiary">
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
