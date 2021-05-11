import { MongoDBPostsRepository } from '../../Posts/MongoDBPostsRepository'
import * as PostsRepository from '../../Posts/PostsRepository'
import bottle from '../bottle'
import { MongoDBClient } from '../../DatabaseClients/MongoDBClient'

bottle.service(PostsRepository.name, MongoDBPostsRepository, MongoDBClient.name)
