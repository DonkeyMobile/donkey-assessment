import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';

interface HttpGatewayLambda {
    path: string;
    method: HttpMethod;
    function: Function
}

export class BackendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const table = this.createTable();

        const createPostLambda = this.createLambda('create-post', table);

        this.createHttpGateway([
            { path: '/v1/posts', method: HttpMethod.POST, function: createPostLambda },
        ]);

        table.grantReadWriteData(createPostLambda);
    }

    private createTable(): Table {
        return new Table(this, 'posts', {
            tableName: 'posts',
            partitionKey: { name: 'pk', type: AttributeType.STRING },
            sortKey: { name: 'sk', type: AttributeType.STRING },
            billingMode: BillingMode.PAY_PER_REQUEST,
            removalPolicy: RemovalPolicy.DESTROY, // on prod, I would set this on RETAIN
        });
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

    private createHttpGateway(lambdas: HttpGatewayLambda[]) {
        const api = new HttpApi(this, 'donkey-wall', {
            createDefaultStage: true,
        });

        for (const lambda of lambdas) {
            api.addRoutes({
                path: lambda.path,
                methods: [lambda.method],
                integration: new HttpLambdaIntegration(`${lambda.function.node.id}-integration`, lambda.function),
            });
        }

        new cdk.CfnOutput(this, 'HttpApiUrl', { value: api.apiEndpoint });
    }
}
