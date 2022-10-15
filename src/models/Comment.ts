export default interface Comment {
  id: number | string
  threadId: number
  timestamp: number
  replier: string
  content: string
  repliedTo?: string
  replyToId?: string
}
