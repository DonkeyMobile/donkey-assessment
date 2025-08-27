import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AttributeType, BillingMode, ProjectionType, Table } from 'aws-cdk-lib/aws-dynamodb';
import { UserPool, UserPoolClient } from 'aws-cdk-lib/aws-cognito';
import { HttpUserPoolAuthorizer } from 'aws-cdk-lib/aws-apigatewayv2-authorizers';

interface HttpGatewayLambda {
    path: string;
    method: HttpMethod;
    function: Function
}

export class BackendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const userPoolAuthoriser = this.createCognito();

        const table = this.createTable();

        const createPostLambda = this.createLambda('create-post', table);
        const getPostsLambda = this.createLambda('get-posts', table);

        this.createHttpGateway(
            [
                { path: '/v1/posts', method: HttpMethod.POST, function: createPostLambda },
                { path: '/v1/posts', method: HttpMethod.GET, function: getPostsLambda },
            ],
            userPoolAuthoriser,
        );

        table.grantReadWriteData(createPostLambda);
        table.grantReadWriteData(getPostsLambda);
    }

    private createCognito(): HttpUserPoolAuthorizer {
        const userPool = new UserPool(this, 'posts-userpool', {
            userPoolName: 'posts-userpool',
            signInCaseSensitive: false,
        });

        const userPoolClient = new UserPoolClient(this, 'posts-userpool-client', {
            userPool: userPool,
            authFlows: {
                userPassword: true,
            },
        });

        new cdk.CfnOutput(this, 'clientId', { value: userPoolClient.userPoolClientId });

        return new HttpUserPoolAuthorizer('posts-userpool-authoriser', userPool, {
            userPoolClients: [userPoolClient],
        });
    }

    private createTable(): Table {
        const table = new Table(this, 'posts-table', {
            tableName: 'posts',
            partitionKey: { name: 'pk', type: AttributeType.STRING },
            sortKey: { name: 'sk', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY, // on prod, I would set this on RETAIN
        });

        table.addGlobalSecondaryIndex({
            indexName: 'gsiAllPosts',
            partitionKey: { name: 'gsi1pk', type: AttributeType.STRING },
            sortKey: { name: 'gsi1sk', type: AttributeType.STRING },
            projectionType: ProjectionType.INCLUDE,
            nonKeyAttributes: ['postId', 'description', 'createdAt', 'userId'],
        });

        return table;
    }

    private createLambda(name: string, table: Table): Function {
        return new NodejsFunction(this, name, {
            entry: path.join(path.dirname(fileURLToPath(import.meta.url)), `../src/handlers/${name}-lambda.ts`),
            runtime: Runtime.NODEJS_22_X,
            handler: 'handler',
            timeout: Duration.seconds(10),
            environment: {
                POSTS_TABLE_NAME: table.tableName,
                POWERTOOLS_DEV: '1',
            },
        });
    }

    private createHttpGateway(lambdas: HttpGatewayLambda[], authoriser: HttpUserPoolAuthorizer) {
        const api = new HttpApi(this, 'posts-http-gateway', {
            createDefaultStage: true,
        });

        for (const lambda of lambdas) {
            api.addRoutes({
                path: lambda.path,
                methods: [lambda.method],
                integration: new HttpLambdaIntegration(`${lambda.function.node.id}-integration`, lambda.function),
                authorizer: authoriser,
            });
        }

        new cdk.CfnOutput(this, 'HttpApiUrl', { value: api.apiEndpoint });
    }
}
