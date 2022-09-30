import { HeaderText, PostText } from 'components/ui/Text'
import { Redirect } from 'wouter'
import { useSnapshot } from 'valtio'
import BurnerWalletCard from 'components/BurnerWalletCard'
import BurnerWalletStore from 'stores/BurnerWalletStore'
import HowItWorks from 'components/HowItWorks'
import classnames, { display, flexDirection, gap } from 'classnames/tailwind'

const wrapper = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-8')
)
const topPart = classnames(
  display('flex'),
  flexDirection('flex-col'),
  gap('gap-y-4')
)

export default function () {
  const { privateKey } = useSnapshot(BurnerWalletStore)

  return (
    <div className={wrapper}>
      {privateKey ? (
        <div className={topPart}>
          <>
            <HeaderText>Voilà — your burner wallet</HeaderText>
            <PostText>
              This wallet verifies that you are a user of Farcaster, but won’t
              reveal who you are. Connect with this wallet in the future to
              create anonymous casts.
            </PostText>
            <BurnerWalletCard privateKey={'123'} />
          </>
        </div>
      ) : (
        <Redirect to="/" />
      )}
      <HowItWorks />
    </div>
  )
}
