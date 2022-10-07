import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'
import { handleError } from '@big-whale-labs/frontend-utils'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'
import safeGetThreadFromContract from 'helpers/safeGetThreadFromContract'

export default async function ({ contract }: { contract: SCPostStorage }) {
  try {
    const totalAmount = await safeGetPostsAmountFromContract(contract)
    if (totalAmount === 0) return Promise.resolve([])

    return safeGetThreadFromContract(0, contract)
  } catch (error) {
    handleError(error)
    return Promise.resolve([] as PostStructOutput[])
  }
}
