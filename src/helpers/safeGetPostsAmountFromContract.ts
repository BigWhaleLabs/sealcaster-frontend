import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'
import { handleError } from '@big-whale-labs/frontend-utils'

export default async function (contract: SCPostStorage) {
  try {
    return Number(await contract.currentPostId())
  } catch (error) {
    handleError(error)
    return Promise.resolve(0)
  }
}
