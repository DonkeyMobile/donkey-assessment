import { GetPostHandler } from '../../Posts/GetPostHandler'
import bottle from '../bottle'

bottle.service(GetPostHandler.name, GetPostHandler)
