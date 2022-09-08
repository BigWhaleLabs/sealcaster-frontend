import { PostStructOutput } from '@big-whale-labs/seal-cred-posts-contract/dist/typechain/contracts/SCPostStorage'
import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'
import { handleError } from '@big-whale-labs/frontend-utils'
import safeGetPostsAmountFromContract from 'helpers/safeGetPostsAmountFromContract'
import safeGetPostsFromContract from 'helpers/safeGetPostsFromContract'

export default async function ({
  contract,
  limitAmount,
  loadedPostAmount = 0,
}: {
  contract: SCPostStorage
  limitAmount: number
  loadedPostAmount?: number
}) {
  try {
    const totalAmount = await safeGetPostsAmountFromContract(contract)
    if (totalAmount === 0) return Promise.resolve([])

    const leftRecords = totalAmount - loadedPostAmount
    const finalLimit = Math.min(limitAmount, leftRecords)
    const shouldSkip = totalAmount - finalLimit - loadedPostAmount
    const finalSkip = Math.max(0, shouldSkip)

    return safeGetPostsFromContract(contract, finalSkip, finalLimit)
  } catch (error) {
    handleError(error)
    return Promise.resolve([] as PostStructOutput[])
  }
}
