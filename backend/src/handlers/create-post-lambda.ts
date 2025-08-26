import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import type { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { CreatePostRequest, CreatePostResponse } from './generated/rest-model';
import { postsService } from '../services/posts-service';
import { Logger } from '@aws-lambda-powertools/logger';

const logger = new Logger({ serviceName: 'create-post-lambda' });

class Lambda implements LambdaInterface {

    public async handler(event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyStructuredResultV2> {
        const post = CreatePostRequest.safeParse(JSON.parse(event.body ?? '{}'));
        if (!post.success) {
            logger.warn('Invalid JSON body ', JSON.parse(post.error.message));
            return {
                statusCode: 400,
                body: JSON.stringify({
                    message: 'Invalid request body',
                    // sending this is a GDPR consideration
                    error: JSON.parse(post.error.message),
                }),
            };
        }

        await postsService.createItem(post.data);

        const response = CreatePostResponse.safeParse({ message: 'created' });
        return {
            statusCode: 201,
            body: JSON.stringify(response.data),
        };
    }
}

const handlerClass: Lambda = new Lambda();
export const handler = handlerClass.handler.bind(handlerClass);
