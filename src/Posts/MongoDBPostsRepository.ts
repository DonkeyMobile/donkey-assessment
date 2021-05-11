import { NotFoundException } from './Expections'
import { Comment } from './Comment'
import { Post } from './Post'
import { PostsRepository } from './PostsRepository'
import { MongoDBClient } from '../DatabaseClients/MongoDBClient'

export class MongoDBPostsRepository implements PostsRepository {
  private readonly mongoDBClient: MongoDBClient

  constructor(mongoDBClient: MongoDBClient) {
    this.mongoDBClient = mongoDBClient
  }

  async byId(postId: string): Promise<Post> {
    const posts = await this.mongoDBClient.collection('posts')

    const post = await posts.findOne({ postId })

    if (!post) {
      throw new NotFoundException(`Post with id '${postId}' does not exist`)
    }

    return post
  }

  async add(post: Post): Promise<void> {
    await (await this.mongoDBClient.collection('posts')).insertOne(post)
  }

  async addComment(postId: string, comment: Comment): Promise<void> {
    const post = await this.byId(postId)

    const update = {
      $set: {
        comments: [...(post.comments || []), comment],
      },
    }

    await (await this.mongoDBClient.collection('posts')).updateOne(
      { postId },
      update
    )
  }

  async delete(postId: string): Promise<void> {
    await (await this.mongoDBClient.collection('posts')).deleteOne({ postId })
  }

  async update(postId: string, newPost: Post) {
    await (await this.mongoDBClient.collection('posts')).replaceOne(
      { postId },
      newPost
    )
  }
}
