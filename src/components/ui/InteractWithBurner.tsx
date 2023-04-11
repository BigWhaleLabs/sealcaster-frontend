import { useLocation } from 'wouter'
import { useSnapshot } from 'valtio'
import { useState } from 'preact/hooks'
import BurnerInteractionStore from 'stores/BurnerInteractionStore'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import InteractWithBurnerModal from 'components/ui/InteractWithBurnerModal'

export default function () {
  const [, setLocation] = useLocation()
  const { interactionClosed } = useSnapshot(BurnerInteractionStore)
  const [destroyBurner, setDestroyBurner] = useState(false)
  const [burnerDestroyed, setBurnerDestroyed] = useState(false)

  if (interactionClosed) return null

  if (burnerDestroyed) {
    return (
      <InteractWithBurnerModal
        sadSeal
        headerText="Nothing lasts forever"
        mainText="That’s okay! You can choose to cast with a different burner wallet each time."
        tertiaryButton={{
          action: () => {
            BurnerInteractionStore.interactionClosed = true
          },
          text: 'Got it',
        }}
      />
    )
  }

  if (destroyBurner) {
    return (
      <InteractWithBurnerModal
        headerText="Are you sure you want to destroy this burner?"
        mainText="If you chose to destroy it or ignore this message, you will lose the wallet forever."
        primaryButton={{
          action: () => {
            BurnerWalletStore.burn()
            setBurnerDestroyed(true)
          },
          text: 'Yes, destroy it',
        }}
        tertiaryButton={{
          action: () => {
            BurnerInteractionStore.interactionClosed = true
            setLocation('#/wallet')
          },
          text: 'View it',
        }}
      />
    )
  }

  return (
    <InteractWithBurnerModal
      showAttention
      headerText="Burner wallet unlocked"
      mainText="You’ve casted using a new burner wallet. This wallet contains a ZK badge that verifies its owner is a Farcaster user, but is completely anonymous. Feel free to keep it or destory it. If you chose to destroy it or ignore this message, you will lose the wallet forever."
      primaryButton={{
        action: () => {
          BurnerInteractionStore.interactionClosed = true
          setLocation('#/wallet')
        },
        text: 'View burner',
      }}
      tertiaryButton={{
        action: () => {
          setDestroyBurner(true)
        },
        text: 'Destroy burner',
      }}
    />
  )
}
