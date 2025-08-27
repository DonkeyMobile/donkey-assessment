import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import type { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { GetPostsResponse } from './generated/rest-model';
import { Logger } from '@aws-lambda-powertools/logger';
import { postsService } from '../services/posts-service';

const logger = new Logger({ serviceName: 'get-post-lambda' });

class Lambda implements LambdaInterface {

    public async handler(event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyStructuredResultV2> {
        const userId = event.requestContext?.authorizer?.jwt.claims.sub;
        if (!userId) {
            logger.warn('Unauthorized request: missing user id in JWT claims');
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Unauthorised' }),
            };
        }

        const posts = await postsService.getPosts();

        const response = GetPostsResponse.safeParse({ message: 'Retrieved', posts: posts });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    }
}

const handlerClass: Lambda = new Lambda();
export const handler = handlerClass.handler.bind(handlerClass);
