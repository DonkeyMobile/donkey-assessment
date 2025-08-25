import { handler } from './create-post-lambda';
import { APIGatewayProxyEvent, Context } from 'aws-lambda';
import { describe, it, expect } from 'vitest';

describe('CreatePostLambda', () => {
    it('should create post lambda with correct values', async () => {
        const result = await handler({} as APIGatewayProxyEvent, {} as Context);
        expect(result).toEqual({
            body: JSON.stringify({ postStatus: 'created' }),
            statusCode: 200,
        });
    });
});