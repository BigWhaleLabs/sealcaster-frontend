import { SCFarcasterLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Signer, providers } from 'ethers'
import env from 'helpers/env'

export default function (signerOrProvider: Signer | providers.Provider) {
  return SCFarcasterLedger__factory.connect(
    env.VITE_SC_FARCASTER_LEDGER_CONTRACT_ADDRESS,
    signerOrProvider
  )
}
