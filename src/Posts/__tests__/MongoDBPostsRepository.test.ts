import { NotFoundException } from '../Expections'
import { MongoDBPostsRepository } from '../MongoDBPostsRepository'
import { MongoDBClient } from '../../DatabaseClients/MongoDBClient'
import { Post } from '../Post'
import { Comment } from '../Comment'

describe('MongoDBPostsRepository', () => {
  const postId = 'postIdtje'
  const post: Post = {
    postId,
    description: 'textje',
    userId: 'ads132',
    timestamp: 12324,
    last_updated: 123243,
  }

  const collection = {
    findOne: jest.fn(),
    insertOne: jest.fn(),
    updateOne: jest.fn(),
    deleteOne: jest.fn(),
    replaceOne: jest.fn(),
  }

  // @ts-ignore
  const mongoDbClient: MongoDBClient = {
    collection: jest.fn().mockReturnValue(collection),
  }

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

    it('should return post', async () => {
      collection.findOne.mockReturnValue(post)

      expect(await getSUT().byId(postId)).toEqual(post)
    })
  })

  describe('#add', () => {
    it('should call insertOne on the client', async () => {
      await getSUT().add(post)

      expect(collection.insertOne).toHaveBeenCalledWith(post)
    })
  })

  describe('#addComment', () => {
    const comment: Comment = {
      description: 'commmentje',
      userId: 'aasdas',
      timestamp: 123243,
    }

    it(`should throw ${NotFoundException.name} when post does not exist`, async () => {
      try {
        await getSUT().addComment(postId, comment)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })

    it('should update the post by adding the comment', async () => {
      collection.findOne.mockReturnValue({
        ...post,
        comments: [comment],
      })

      const newComment = {
        ...comment,
        description: 'newCommentje',
      }

      await getSUT().addComment(postId, newComment)

      expect(collection.updateOne).toHaveBeenCalledWith(
        { postId },
        {
          $set: {
            comments: [comment, newComment],
          },
        }
      )
    })
  })

  describe('#delete', () => {
    it('should call deleteOne on the client', async () => {
      await getSUT().delete(postId)

      expect(collection.deleteOne).toHaveBeenCalledWith({ postId })
    })
  })

  describe('#update', () => {
    it('should call replaceOne on the client', async () => {
      const newPost = { ...post, description: 'newDescription' }
      await getSUT().update(postId, newPost)

      expect(collection.replaceOne).toHaveBeenCalledWith({ postId }, newPost)
    })
  })

  const getSUT = () => {
    return new MongoDBPostsRepository(mongoDbClient)
  }
})
