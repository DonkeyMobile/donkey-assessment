import { Request, Response } from 'express'

export class GetPostHandler {
  async handle(request: Request, response: Response): Promise<void> {
    response.send('<h1>Hello from the TypeScript world1!</h1>')
  }
}
