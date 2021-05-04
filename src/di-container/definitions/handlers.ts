import { GetPostHandler } from '../../Posts/GetPostHandler'
import * as PostsRepository from '../../Posts/PostsRepository'
import bottle from '../bottle'

bottle.service(GetPostHandler.name, GetPostHandler, PostsRepository.name)
