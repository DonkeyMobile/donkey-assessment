import { MongoDBPostsRepository } from '../../Posts/MongoDBPostsRepository'
import * as PostsRepository from '../../Posts/PostsRepository'
import bottle from '../bottle'

bottle.service(PostsRepository.name, MongoDBPostsRepository)
