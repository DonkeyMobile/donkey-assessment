import { Request, Response } from 'express'
import { MongoDBClient } from './MongoDBClient'

export const CloseMongoDBClientMiddleware = async (
  request: Request,
  response: Response,
  next: Function
) => {
  await MongoDBClient.disconnect()
  next()
}
