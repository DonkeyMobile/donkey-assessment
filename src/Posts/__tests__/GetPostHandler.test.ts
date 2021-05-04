import { Request, Response } from 'express'
import { NotFoundException } from '../Expections'
import { GetPostHandler } from '../GetPostHandler'

describe('getPostHandler', () => {
  const postId = 'postIdtje'
  // @ts-ignore
  const request: Request = {
    params: { postId },
  }

  // @ts-ignore
  const response: Response = {
    sendStatus: jest.fn(),
  }

  const postsRepository = {
    byId: jest.fn(),
  }

  beforeEach(() => {
    jest.clearAllMocks()
    expect.hasAssertions()
  })

  describe('#handle', () => {
    it('should return 404 when post does not exist', async () => {
      postsRepository.byId.mockImplementation(() => {
        throw new NotFoundException()
      })

      await getSUT().handle(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(404)
    })

    it('should return 500 when unknown error occurs', async () => {
      postsRepository.byId.mockImplementation(() => {
        throw new Error()
      })

      await getSUT().handle(request, response)

      expect(response.sendStatus).toHaveBeenCalledWith(500)
    })
  })

  const getSUT = () => {
    return new GetPostHandler(postsRepository)
  }
})
