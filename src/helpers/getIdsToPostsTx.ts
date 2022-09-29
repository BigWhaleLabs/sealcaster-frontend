import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  const posts = await contract.queryFilter(contract.filters.PostSaved())
  return posts.map((post) => post.transactionHash)
}
