import { SCPostStorage } from '@big-whale-labs/seal-cred-posts-contract'

export default async function (contract: SCPostStorage) {
  const replyAllAddress = await contract.replyAllAddress()
  const posts = await contract.queryFilter(contract.filters.PostSaved())
  return posts.reduce(
    (ids, post) =>
      post.args.sender === replyAllAddress
        ? [post.args.id.toNumber(), ...ids]
        : ids,
    [] as number[]
  )
}
