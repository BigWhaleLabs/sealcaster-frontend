import { Redirect, Route, RouteProps } from 'wouter'
import { Suspense } from 'preact/compat'
import useAccount from 'hooks/useAccount'

function ProtectedSuspended({ ...rest }: RouteProps) {
  const { isBurned, account, walletLoading } = useAccount()

  if (walletLoading) return <></>

  if (!account || !isBurned) return <Redirect to="/" />

  return <Route {...rest} />
}

export default function ({ ...rest }: RouteProps) {
  return (
    <Suspense fallback={<></>}>
      <ProtectedSuspended {...rest} />
    </Suspense>
  )
}
