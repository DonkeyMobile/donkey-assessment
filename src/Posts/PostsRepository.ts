import { Post } from './Post'

export interface PostsRepository {
  byId(postId: string): Promise<Post>
}

export const name = 'PostsRepository'
