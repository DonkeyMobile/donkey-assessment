import { ulid } from 'ulid';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreatePostRequest, Post } from '../handlers/generated/rest-model';
import { Temporal } from 'temporal-polyfill';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const tableName: string = process.env.POSTS_TABLE_NAME ?? '';

export class PostsService {
    async createItem(post: CreatePostRequest, userId: string): Promise<Post> {
        const postId = ulid();
        const now = Temporal.Now.instant().toString();

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

        return {
            postId: postId,
            description: post.description,
            createdAt: now,
            updatedAt: now,
            userId: userId,
        };
    }
}

export const postsService = new PostsService();