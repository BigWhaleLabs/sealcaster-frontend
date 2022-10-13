export type Cast = {
  threadMerkleRoot: string
  merkleRoot: string
  sequence: number
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
