import { LambdaInterface } from '@aws-lambda-powertools/commons/types';
import { APIGatewayProxyEvent, APIGatewayProxyStructuredResultV2, Context } from 'aws-lambda';

class Lambda implements LambdaInterface {
     
    public async handler(_event: APIGatewayProxyEvent, _context: Context): Promise<APIGatewayProxyStructuredResultV2> {
        return {
            statusCode: 200,
            body: JSON.stringify({
                postStatus: 'created',
            }),
        };
    }
}

const handlerClass: Lambda = new Lambda();
export const handler = handlerClass.handler.bind(handlerClass);