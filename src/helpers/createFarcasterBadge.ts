import { SCFarcasterLedger__factory } from '@big-whale-labs/seal-cred-ledger-contract'
import { Signer } from 'ethers'
import ProofResult from 'models/ProofResult'
import env from 'helpers/env'
import makeTransaction from 'helpers/makeTransaction'

function createContract(signer: Signer) {
  return SCFarcasterLedger__factory.connect(
    env.VITE_SC_FARCASTER_LEDGER_CONTRACT_ADDRESS,
    signer
  )
}

export default async function (signer: Signer, result: ProofResult) {
  if (!result) throw new Error('Invalid proof')
  const contract = createContract(signer)
  const txData = makeTransaction(result)

  const tx = await contract.mint(txData)

  return tx.wait()
}
