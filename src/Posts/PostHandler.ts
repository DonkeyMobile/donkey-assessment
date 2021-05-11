import { Request, Response } from 'express'
import { NotFoundException } from './Expections'
import { PostsRepository } from './PostsRepository'
import { v4 as generateUUID } from 'uuid'

export class PostHandler {
  private readonly _postsRepository: PostsRepository

  constructor(postsRepository: PostsRepository) {
    this._postsRepository = postsRepository
  }

  async handleGet(request: Request, response: Response): Promise<Response> {
    const postId = request.params.postId

    try {
      const post = await this._postsRepository.byId(postId)

      return response.send(post)
    } catch (error) {
      switch (error.constructor) {
        case NotFoundException:
          return response.sendStatus(404)
        default:
          console.error(error)
          return response.sendStatus(500)
      }
    }
  }

  async handlePost(request: Request, response: Response): Promise<Response> {
    try {
      const postId = generateUUID()
      const { description, userId } = request.body
      const time = Date.now()

      await this._postsRepository.add({
        postId,
        description,
        timestamp: time,
        last_updated: time,
        userId,
      })

      return response.status(200).send({ postId })
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  }

  async handlePut(request: Request, response: Response): Promise<Response> {
    try {
      const postId = request.params.postId

      const { description } = request.body

      const post = await this._postsRepository.byId(postId)

      await this._postsRepository.update(postId, {
        ...post,
        description,
        last_updated: Date.now(),
      })

      return response.status(204).send()
    } catch (error) {
      switch (error.constructor) {
        case NotFoundException:
          return response.sendStatus(404)
        default:
          console.error(error)
          return response.sendStatus(500)
      }
    }
  }

  async handleDelete(request: Request, response: Response): Promise<Response> {
    try {
      const postId = request.params.postId

      await this._postsRepository.delete(postId)

      return response.status(204).send()
    } catch (error) {
      console.error(error)
      return response.sendStatus(500)
    }
  }
}
