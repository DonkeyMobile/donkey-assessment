import * as PostsRepository from '../../Posts/PostsRepository'
import bottle from '../bottle'
import { PostHandler } from '../../Posts/PostHandler'
import { CommentHandler } from '../../Posts/CommentHandler'

bottle.service(PostHandler.name, PostHandler, PostsRepository.name)
bottle.service(CommentHandler.name, CommentHandler, PostsRepository.name)
