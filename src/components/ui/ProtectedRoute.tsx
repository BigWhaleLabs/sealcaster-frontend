import { Redirect, Route, RouteProps } from 'wouter'
import useAccount from 'hooks/useAccount'

export default function ({ ...rest }: RouteProps) {
  const { isBurned, account, walletLoading } = useAccount()

  if (walletLoading) return <>Loading...</>

  if (!account || !isBurned) return <Redirect to="/" />

  return <Route {...rest} />
}
