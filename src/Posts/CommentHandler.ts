import { Request, Response } from 'express'
import { NotFoundException } from './Expections'
import { PostsRepository } from './PostsRepository'
import { v4 as generateUUID } from 'uuid'

export class CommentHandler {
  private readonly _postsRepository: PostsRepository

  constructor(postsRepository: PostsRepository) {
    this._postsRepository = postsRepository
  }

  async handlePost(request: Request, response: Response): Promise<Response> {
    try {
      const postId = request.params.postId
      const { description, userId } = request.body

      await this._postsRepository.addComment(postId, {
        description,
        timestamp: Date.now(),
        userId,
      })

      return response.status(204).send()
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  }
}
