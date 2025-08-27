import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import type { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { CreatePostRequest, CreatePostResponse } from './generated/rest-model';
import { postsService } from '../services/posts-service';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'create-post-lambda' });

class Lambda implements LambdaInterface {

    public async handler(event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyStructuredResultV2> {
        const postRequest = CreatePostRequest.safeParse(JSON.parse(event.body ?? '{}'));
        if (!postRequest.success) {
            logger.warn('Invalid JSON body ', JSON.parse(postRequest.error.message));
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Invalid request body',
                    // sending this is a GDPR consideration
                    error: JSON.parse(postRequest.error.message),
                }),
            };
        }


        const userId = event.requestContext?.authorizer?.jwt.claims.sub;
        if (!userId) {
            logger.warn('Unauthorized request: missing user id in JWT claims');
            return {
                statusCode: 401,
                body: JSON.stringify({ message: 'Unauthorised' }),
            };
        }

        const post = await postsService.createPost(postRequest.data, userId);

        const response = CreatePostResponse.safeParse({ message: 'created', post: post });
        return {
            statusCode: 201,
            body: JSON.stringify(response.data),
        };
    }
}

const handlerClass: Lambda = new Lambda();
export const handler = handlerClass.handler.bind(handlerClass);
