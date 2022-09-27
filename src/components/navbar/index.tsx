import { Suspense } from 'preact/compat'
import Navbar from 'components/navbar/Navbar'
import useBadgeAccount from 'hooks/useBadgeAccount'

function NavBarSuspended() {
  const { account } = useBadgeAccount()

  return (
    <Navbar account={account} needNetworkChange={false} logoText="Sealcaster" />
  )
}

export default function () {
  return (
    <Suspense
      fallback={<Navbar needNetworkChange={false} logoText="Sealcaster" />}
    >
      <NavBarSuspended />
    </Suspense>
  )
}
