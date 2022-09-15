import { Suspense } from 'preact/compat'
import Logo from 'icons/Logo'
import Navbar from 'components/navbar/Navbar'
import useAccount from 'hooks/useAccount'

function NavBarSuspended() {
  const { account } = useAccount()

  return (
    <Navbar
      logo={<Logo />}
      account={account}
      needNetworkChange={false}
      logoText="SealCaster"
    />
  )
}

export default function () {
  return (
    <Suspense
      fallback={
        <Navbar
          loading
          logo={<Logo />}
          needNetworkChange={false}
          logoText="SealCaster"
        />
      }
    >
      <NavBarSuspended />
    </Suspense>
  )
}
