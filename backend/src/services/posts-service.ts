import { ulid } from 'ulid';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreatePostRequest } from '../handlers/generated/rest-model';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const tableName: string = process.env.POSTS_TABLE_NAME ?? '';

export class PostsService {
    async createItem(post: CreatePostRequest) {
        const item = {
            pk: 'USER#cognito-sub-123456',
            sk: 'TS#2025-08-26T20:15:33.120Z|POST#01J9ABCDEF123XYZ456',
            postId: ulid(),
            userId: 'cognito-sub-123456',
            description: post.description,
            createdAt: '2025-08-26T20:15:33.120Z',
            updatedAt: '2025-08-26T20:15:33.120Z',
        };

        await client.send(new PutCommand({
            TableName: tableName,
            Item: item,
        }));
    }
}

export const postsService = new PostsService();