export default interface Comment {
  id: number
  threadId: number
  timestamp: number
  replier: string
  repliedTo: string
  content: string
  replies?: Comment[]
}
