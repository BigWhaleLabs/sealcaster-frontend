import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'
import { handleError } from '@big-whale-labs/frontend-utils'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'

export default async function (threadId = 0, contract: SCPostStorage) {
  try {
    return (await contract.getThread(threadId))
      .map(safeTransformPostOutput)
      .filter((post) => +post.id !== 0)
      .reverse()
  } catch (error) {
    handleError(error)
    return []
  }
}
