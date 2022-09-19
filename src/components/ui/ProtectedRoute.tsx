import { Redirect, Route, RouteProps } from 'wouter'
import { Suspense } from 'preact/compat'
import Loading from 'icons/Loading'
import useAccount from 'hooks/useAccount'

function ProtectedSuspended({ ...rest }: RouteProps) {
  const { isBurned, walletLoading } = useAccount()

  if (walletLoading) return <Loading screenCentre />

  if (!isBurned) return <Redirect to="/" />

  return <Route {...rest} />
}

export default function ({ ...rest }: RouteProps) {
  return (
    <Suspense fallback={<></>}>
      <ProtectedSuspended {...rest} />
    </Suspense>
  )
}
