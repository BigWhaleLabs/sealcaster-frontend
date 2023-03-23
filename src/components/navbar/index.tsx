import { Suspense } from 'preact/compat'
import Navbar from 'components/navbar/Navbar'
import useBadgeAccount from 'hooks/useBadgeAccount'

function NavBarSuspended() {
  const account = useBadgeAccount()

  return (
    <Navbar account={account} logoText="Sealcaster" needNetworkChange={true} />
  )
}

export default function () {
  return (
    <Suspense
      fallback={<Navbar logoText="Sealcaster" needNetworkChange={true} />}
    >
      <NavBarSuspended />
    </Suspense>
  )
}
