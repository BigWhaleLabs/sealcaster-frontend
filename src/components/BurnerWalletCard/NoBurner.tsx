import { AccentText, BodyText } from 'components/ui/Text'
import { Suspense } from 'preact/compat'
import { displayFrom, displayTo } from 'helpers/visibilityClassnames'
import { useSnapshot } from 'valtio'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import Card from 'components/ui/Card'
import Cross from 'icons/Cross'
import SealSad from 'icons/SealSad'
import WalletStore from 'stores/WalletStore'
import classnames, {
  alignItems,
  display,
  flexDirection,
  gap,
  margin,
} from 'classnames/tailwind'
import useBadgeAccount from 'hooks/useBadgeAccount'

const desktopWrapper = classnames(
  display('flex'),
  gap('gap-x-4'),
  alignItems('md:items-center')
)

const mobileWrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-3', 'md:gap-y-1')
)
const mobileTitle = classnames(
  display('flex'),
  gap('gap-x-2'),
  alignItems('items-center')
)

export function NoNurnerSuspended() {
  const {
    account: walletStoreAccount,
    acceptedNotBurner,
    hasFarcasterBadge,
  } = useSnapshot(WalletStore)
  const account = useBadgeAccount()
  const { generatingBurner } = useSnapshot(BurnerWalletStore)

  if (
    generatingBurner ||
    !account ||
    account !== walletStoreAccount ||
    acceptedNotBurner ||
    hasFarcasterBadge
  )
    return null

  return (
    <div className={margin('mt-8')}>
      <Card error small smallRadius>
        <div className={desktopWrapper}>
          <div className={displayFrom('md')}>
            <SealSad sealColor="stroke-accent" triangleColor="stroke-error" />
          </div>
          <div className={mobileWrapper}>
            <div className={mobileTitle}>
              <div className={displayTo('md')}>
                <SealSad
                  sealColor="stroke-accent"
                  triangleColor="stroke-error"
                />
              </div>
              <AccentText color="text-error" primary large bold>
                You didn’t connect a burner.
              </AccentText>
            </div>
            <BodyText primary large>
              That’s okay, you can still post with a burner wallet. Or you can
              disconnect your wallet and connect a burner.
            </BodyText>
          </div>

          <Cross onClick={() => (WalletStore.acceptedNotBurner = true)} />
        </div>
      </Card>
    </div>
  )
}

export default function () {
  return (
    <Suspense fallback="">
      <NoNurnerSuspended />
    </Suspense>
  )
}
