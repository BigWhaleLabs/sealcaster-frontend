import { Signer } from 'ethers'
import ProofResult from 'models/ProofResult'
import createFarcasterLedger from 'helpers/createFarcasterLedger'
import makeTransaction from 'helpers/makeTransaction'

export default async function (signer: Signer, result: ProofResult) {
  const contract = createFarcasterLedger(signer)
  const txData = makeTransaction(result)
  const tx = await contract.mint(txData)
  return tx.wait()
}
