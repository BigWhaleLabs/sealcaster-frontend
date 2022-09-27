import { Redirect, Route, RouteProps, useLocation } from 'wouter'
import { Suspense } from 'preact/compat'
import Loading from 'icons/Loading'
import useBadgeAccount from 'hooks/useBadgeAccount'

function ProtectedSuspended({ ...rest }: RouteProps) {
  const { isBurner, walletLoading } = useBadgeAccount()
  const [location] = useLocation()

  if (walletLoading) return <Loading screenCentre />
  if (!isBurner && rest.path === location) return <Redirect to="/" />
  return <Route {...rest} />
}

export default function ({ ...rest }: RouteProps) {
  return (
    <Suspense fallback={<></>}>
      <ProtectedSuspended {...rest} />
    </Suspense>
  )
}
