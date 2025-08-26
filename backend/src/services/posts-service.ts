import { ulid } from 'ulid';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreatePostRequest } from '../handlers/generated/rest-model';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const tableName: string = process.env.POSTS_TABLE_NAME ?? '';

export class PostsService {
    async createItem(post: CreatePostRequest) {
        const postId = ulid();
        const now = new Date().toISOString();
        const userId = 'cognito-sub-123456';

        const item = {
            pk: `USER#${userId}`,
            sk: `POST#${postId}`,
            postId,
            userId,
            description: post.description,
            createdAt: now,
            updatedAt: now,
        };

        await client.send(new PutCommand({
            TableName: tableName,
            Item: item,
        }));
    }
}

export const postsService = new PostsService();