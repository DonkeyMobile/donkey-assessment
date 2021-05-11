import { Request, Response } from 'express'
import { NotFoundException } from '../Expections'
import { PostHandler } from '../PostHandler'
import { PostsRepository } from '../PostsRepository'
import { v4 as generateUUID } from 'uuid'
import { Post } from '../Post'

jest.mock('uuid')

describe('PostHandler', () => {
  const postId = 'postIdtje'
  // @ts-ignore
  const request: Request = {
    params: { postId },
  }

  // @ts-ignore
  const response: Response = {
    sendStatus: jest.fn(),
  }

  // @ts-ignore
  const postsRepository: PostsRepository = {
    byId: jest.fn(),
    add: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  }

  let consoleError: Function

  beforeAll(() => {
    consoleError = console.error
    console.error = jest.fn()
  })

  afterAll(() => {
    // @ts-ignore
    console.error = consoleError
  })

  beforeEach(() => {
    jest.clearAllMocks()
    expect.hasAssertions()

    // @ts-ignore
    generateUUID.mockReturnValue('randomIdtje')
  })

  describe('#handleGet', () => {
    it('should return 404 when post does not exist', async () => {
      // @ts-ignore
      postsRepository.byId.mockImplementation(() => {
        throw new NotFoundException()
      })

      await getSUT().handleGet(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(404)
    })

    it('should return 500 when unknown error occurs', async () => {
      // @ts-ignore
      postsRepository.byId.mockImplementation(() => {
        throw new Error()
      })

      await getSUT().handleGet(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(500)
    })
  })

  describe('#handlePost', () => {
    it('should return 500 when unknown error occurs', async () => {
      // @ts-ignore
      postsRepository.add.mockImplementation(() => {
        throw new Error()
      })

      await getSUT().handlePost(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(500)
    })

    it('should call add on postRepository with received data', async () => {
      request.body = {
        description: 'hoi',
        userId: 'userIdtje',
      }

      await getSUT().handlePost(request, response)

      expect(postsRepository.add).toHaveBeenCalledWith({
        postId,
        description: 'hoi',
        userId: 'userIdtje',
        last_updated: expect.any(Number),
        timestamp: expect.any(Number),
      })
    })
  })

  describe('#handlePut', () => {
    beforeEach(() => {
      request.body = {
        description: 'newDescription',
      }
    })

    it('should return 404 when post does not exist', async () => {
      // @ts-ignore
      postsRepository.byId.mockImplementation(() => {
        throw new NotFoundException()
      })

      await getSUT().handlePut(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(404)
    })

    it('should return 500 when unknown error occurs', async () => {
      // @ts-ignore
      postsRepository.byId.mockImplementation(() => {
        throw new Error()
      })

      await getSUT().handlePut(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(500)
    })

    it('should call update on postRepository with received data', async () => {
      const post: Post = {
        postId,
        userId: 'henk',
        timestamp: 1213242,
        last_updated: 1213242,
        description: 'oldDescription',
        comments: [],
      }

      // @ts-ignore
      postsRepository.byId.mockReturnValue(post)

      await getSUT().handlePut(request, response)

      expect(postsRepository.update).toHaveBeenCalledWith(postId, {
        ...post,
        description: 'newDescription',
        last_updated: expect.any(Number),
      })
    })
  })

  describe('#handleDelete', () => {
    it('should return 500 when unknown error occurs', async () => {
      // @ts-ignore
      postsRepository.delete.mockImplementation(() => {
        throw new Error()
      })

      await getSUT().handleDelete(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(500)
    })

    it('should call delete on postRepository for given post id', async () => {
      await getSUT().handleDelete(request, response)

      expect(postsRepository.delete).toHaveBeenCalledWith(postId)
    })
  })

  const getSUT = () => {
    return new PostHandler(postsRepository)
  }
})
