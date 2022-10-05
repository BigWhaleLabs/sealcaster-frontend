export default interface Comment {
  timestamp: number
  replier: string
  repliedTo: string
  content: string
  replies?: Comment[]
}
