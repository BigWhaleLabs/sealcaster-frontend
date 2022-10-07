import { BigNumber } from 'ethers'
import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'
import { handleError } from '@big-whale-labs/frontend-utils'
import safeTransformPostOutput from 'helpers/safeTransformPostOutput'

export default async function (
  contract: SCPostStorage,
  skip: number,
  limit: number
) {
  try {
    return (
      await contract.getPosts(BigNumber.from(skip), BigNumber.from(limit))
    )
      .map(safeTransformPostOutput)
      .reverse()
  } catch (error) {
    handleError(error)
    return []
  }
}
