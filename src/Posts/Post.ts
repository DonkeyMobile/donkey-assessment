export type Post = {
  postId: string
  description: string
  timestamp: number
  last_updated: number
  userId: string
  comments?: Comment[]
}
