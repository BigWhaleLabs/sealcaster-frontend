export type Cast = {
  postId?: number
  threadMerkleRoot: string
  merkleRoot: string
  body: {
    publishedAt: number
    username: string
    address: string
    data: {
      text: string
      replyParentMerkleRoot: string
    }
  }
}
