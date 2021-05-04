import { NotFoundException } from '../Expections'
import { MongoDBPostsRepository } from '../MongoDBPostsRepository'

describe('MongoDBPostsRepository', () => {
  const postId = 'postIdtje'

  beforeEach(() => {
    jest.clearAllMocks()
    expect.hasAssertions()
  })

  describe('#getById', () => {
    it(`should throw ${NotFoundException.name} when post does not exist`, async () => {
      try {
        await getSUT().byId(postId)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  const getSUT = () => {
    return new MongoDBPostsRepository()
  }
})
