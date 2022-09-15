import { Redirect } from 'wouter'
import ChildrenProp from 'models/ChildrenProp'
import useAccount from 'hooks/useAccount'

export default function ({ children }: ChildrenProp) {
  const { isBurned, account, walletLoading } = useAccount()

  if (walletLoading) return <>Loading...</>

  if (!account || !isBurned) return <Redirect to="/" />

  return <>{children}</>
}
