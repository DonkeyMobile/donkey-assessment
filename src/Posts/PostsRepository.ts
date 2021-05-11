import { Comment } from './Comment'
import { Post } from './Post'

export interface PostsRepository {
  byId(postId: string): Promise<Post>

  add(post: Post): Promise<void>

  addComment(postId: string, comment: Comment): Promise<void>

  update(postId: string, newPost: Post): Promise<void>

  delete(postId: string): Promise<void>
}

export const name = 'PostsRepository'
