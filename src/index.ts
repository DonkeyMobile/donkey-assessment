import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import container from './di-container/container'
import { CloseMongoDBClientMiddleware } from './DatabaseClients/CloseMongoDBClientMiddleware'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Express = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/posts/:postId', async (req: Request, res: Response) => {
  try {
    await container.PostHandler.handleGet(req, res)
  } catch (error) {
    console.error(error)
  }
})

app.delete('/posts/:postId', async (req: Request, res: Response) => {
  try {
    await container.PostHandler.handleDelete(req, res)
  } catch (error) {
    console.error(error)
  }
})

app.put('/posts/:postId', async (req: Request, res: Response) => {
  try {
    await container.PostHandler.handlePut(req, res)
  } catch (error) {
    console.error(error)
  }
})

app.post('/posts/', async (req: Request, res: Response) => {
  try {
    await container.PostHandler.handlePost(req, res)
  } catch (error) {
    console.error(error)
  }
})

app.post('/posts/:postId/comment', async (req: Request, res: Response) => {
  try {
    await container.CommentHandler.handlePost(req, res)
  } catch (error) {
    console.error(error)
  }
})

app.use(CloseMongoDBClientMiddleware)

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
