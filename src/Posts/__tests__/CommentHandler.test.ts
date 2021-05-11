import { Request, Response } from 'express'
import { PostsRepository } from '../PostsRepository'
import { CommentHandler } from '../CommentHandler'

describe('CommentHandler', () => {
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
    addComment: jest.fn(),
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
  })

  describe('#handlePost', () => {
    it('should return 500 when unknown error occurs', async () => {
      // @ts-ignore
      postsRepository.addComment.mockImplementation(() => {
        throw new Error()
      })

      await getSUT().handlePost(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(500)
    })

    it('should call addComment on postRepository with received data', async () => {
      request.body = {
        description: 'hoi',
        userId: 'userIdtje',
      }

      await getSUT().handlePost(request, response)

      expect(postsRepository.addComment).toHaveBeenCalledWith(postId, {
        description: 'hoi',
        userId: 'userIdtje',
        timestamp: expect.any(Number),
      })
    })
  })

  const getSUT = () => {
    return new CommentHandler(postsRepository)
  }
})
