import { SCFarcasterDerivative__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import defaultProvider from 'helpers/providers/defaultProvider'
import farcasterLedger from 'helpers/farcasterLedger'

export default async function (address: string) {
  const farcatesterDerivativeAddress =
    await farcasterLedger.originalToDerivative('farcaster')

  if (parseInt(farcatesterDerivativeAddress, 16) === 0) return false

  const contract = SCFarcasterDerivative__factory.connect(
    farcatesterDerivativeAddress,
    defaultProvider
  )
  const balance = await contract.balanceOf(address)
  return balance.gt(0)
}
