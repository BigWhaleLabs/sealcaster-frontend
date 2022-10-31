import { Suspense } from 'preact/compat'
import Navbar from 'components/navbar/Navbar'
import useBadgeAccount from 'hooks/useBadgeAccount'

function NavBarSuspended() {
  const account = useBadgeAccount()

  return (
    <Navbar account={account} needNetworkChange={true} logoText="Sealcaster" />
  )
}

export default function () {
  return (
    <Suspense
      fallback={<Navbar needNetworkChange={true} logoText="Sealcaster" />}
    >
      <NavBarSuspended />
    </Suspense>
  )
}
