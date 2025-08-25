import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { HttpApi, HttpMethod } from 'aws-cdk-lib/aws-apigatewayv2';
import * as path from 'node:path';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Runtime, Function } from 'aws-cdk-lib/aws-lambda';
import { Duration } from 'aws-cdk-lib';
import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

interface HttpGatewayLambda {
    path: string;
    method: HttpMethod;
    function: Function
}

export class BackendStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);


        this.createHttpGateway([
            { path: '/v1/posts', method: HttpMethod.POST, function: this.createLambda('create-post') },
        ]);
    }

    private createLambda(name: string): Function {
        return new NodejsFunction(this, name, {
            entry: path.join(__dirname, `../src/handlers/${name}-lambda.ts`),
            runtime: Runtime.NODEJS_22_X,
            handler: 'handler',
            timeout: Duration.seconds(10),

        });
    }

    private createHttpGateway(lambdas: HttpGatewayLambda[]) {
        const api = new HttpApi(this, 'donkey-wall');
        for (const lambda of lambdas) {
            api.addRoutes({
                path: lambda.path,
                methods: [lambda.method],
                integration: new HttpLambdaIntegration(`${lambda.function.node.id}-integration`, lambda.function),
            });
        }
    }
}
