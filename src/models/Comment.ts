export default interface Comment {
  id: number | string
  threadId: number
  timestamp: number
  replier: string
  repliedTo: string
  content: string
  isThreadOwned?: boolean
  replies?: Comment[]
  replyToId?: string
}
