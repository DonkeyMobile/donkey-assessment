import { handler } from './create-post-lambda';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { postsService } from '../services/posts-service';
import { CreatePostResponse } from './generated/rest-model';

describe('CreatePostLambda', () => {
    const createPostSpy = vi.spyOn(postsService, 'createPost');

    afterEach(() => {
        vi.resetAllMocks();
    });

    it('should create post lambda with correct values', async () => {
        createPostSpy.mockResolvedValue({
            postId: '01FZ8Z6Y0KX6Z6Y0KX6Z6Y0KX',
            userId: 'user123',
            description: 'This is a test post',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

        const event = {
            headers: {},
            pathParameters: {},
            body: JSON.stringify(
                {
                    description: 'This is a test post',
                },
            ),
            requestContext: { authorizer: { jwt: { claims: { sub: 'user123' } } } },
        };
        const result = await handler(event as never as APIGatewayProxyEvent, {} as Context);
        expect(result.statusCode).toEqual(201);

        const resultBody = CreatePostResponse.parse(JSON.parse(result.body as string));
        expect(resultBody.message).toEqual('created');
    });
});
