import { Request, Response } from 'express'
import { NotFoundException } from './Expections'
import { PostsRepository } from './PostsRepository'

export class GetPostHandler {
  private readonly _postsRepository: PostsRepository

  constructor(postsRepository: PostsRepository) {
    this._postsRepository = postsRepository
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId

    try {
      await this._postsRepository.byId(postId)
    } catch (error) {
      switch (error.constructor) {
        case NotFoundException:
          return response.sendStatus(404)
        default:
          return response.sendStatus(500)
      }
    }

    return response.send(`<h1>${postId}</h1>`)
  }
}
