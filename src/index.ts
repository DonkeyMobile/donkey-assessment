import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import express, { Express, Request, Response } from 'express'
import helmet from 'helmet'
import container from './di-container/container'

dotenv.config()

const PORT = process.env.PORT || 3000
const app: Express = express()

app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  await container.GetPostHandler.handle(req, res)
})

app.listen(PORT, () => console.log(`Running on ${PORT} ⚡`))
