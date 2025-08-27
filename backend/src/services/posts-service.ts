import { ulid } from 'ulid';
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CreatePostRequest, Post } from '../handlers/generated/rest-model';
import { Temporal } from 'temporal-polyfill';

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}));
const tableName: string = process.env.POSTS_TABLE_NAME ?? '';
if (!tableName) {
    throw new Error('POSTS_TABLE_NAME is not set');
}
export class PostsService {
    async createPost(post: CreatePostRequest, userId: string): Promise<Post> {
        const postId = ulid();
        const now = Temporal.Now.instant().toString();

        const item = {
            pk: `USER#${userId}`,
            sk: `POST#${postId}`,

            gsi1pk: 'POST',
            gsi1sk: `POST#${postId}`,

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

    async getPosts(): Promise<Post[]> {
        const result = await client.send(new QueryCommand({
            TableName: tableName,
            IndexName: 'gsiAllPosts',
            KeyConditionExpression: 'gsi1pk = :p AND begins_with(gsi1sk, :s)',
            ExpressionAttributeValues: { ':p': 'POST', ':s': 'POST#' },
            ScanIndexForward: false,
            Limit: 20,
        }));

        return result.Items as Post[] ?? [];
    }
}

export const postsService = new PostsService();