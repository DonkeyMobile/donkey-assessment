import { Logger } from '@aws-lambda-powertools/logger';
import { injectLambdaContext } from '@aws-lambda-powertools/logger/middleware'; // <-- middy middleware
import { parser } from '@aws-lambda-powertools/parser/middleware';
import { JSONStringified } from '@aws-lambda-powertools/parser/helpers';
import middy from '@middy/core';
import type { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import type { APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';
import { z } from 'zod';
import { CreatePostRequest, CreatePostResponse } from './generated/rest-model';
import { postsService } from '../services/posts-service';
import { APIGatewayProxyEventV2Schema } from '@aws-lambda-powertools/parser/schemas';

const CreatePostEventSchema = APIGatewayProxyEventV2Schema.extend({
    body: JSONStringified(CreatePostRequest),
});
type CreatePostEvent = z.infer<typeof CreatePostEventSchema>;

const logger = new Logger({ serviceName: 'create-post' });

class Lambda implements LambdaInterface {

    public async handler(event: CreatePostEvent, _context: Context): Promise<APIGatewayProxyStructuredResultV2> {
        const post = CreatePostRequest.parse(event.body);

        await postsService.createItem(post);

        const response = CreatePostResponse.safeParse({ message: 'created' });
        return {
            statusCode: 200,
            body: JSON.stringify(response.data),
        };
    }
}

const instance = new Lambda();

export const handler = middy(instance.handler.bind(instance))
    .use(injectLambdaContext(logger))
    .use(parser({ schema: CreatePostEventSchema }));