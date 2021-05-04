import { NotFoundException } from './Expections'
import { Post } from './Post'
import { PostsRepository } from './PostsRepository'

export class MongoDBPostsRepository implements PostsRepository {
  byId(postId: string): Promise<Post> {
    throw new NotFoundException(`Post with id '${postId}' does not exist`)
  }
}
