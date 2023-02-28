export type Cast = {
  postId?: number
  hash: string
  threadHash: string
  parentHash: string
  timestamp: number
  text: string
  author: {
    fid: number
    username: string
  }
}
