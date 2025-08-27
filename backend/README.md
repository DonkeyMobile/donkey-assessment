# Timeline

## Getting started

To get started in AWS, first replace your aws account id in backend.ts and then deploy the CDK stack:
```bash
npm run cdk:deploy
```

Next, create a user in cognito, let cognito generate a password and let is be sent to your mail.

Log in via the following command:
 - client id is output of the CDK stack
 - Username and password need to be replaced as well
```bash
aws cognito-idp initiate-auth \
  --auth-flow USER_PASSWORD_AUTH \
  --client-id $CLIENT_ID \
  --auth-parameters USERNAME=$USERNAME,PASSWORD=$PASSWORD \
  --query 'AuthenticationResult.IdToken' \
  --output text
```

While you could use the Bruno (open source postman) collection I've made, it is easier to use curl: 
 - please replace the base url and the bearer
```bash
curl -i -X POST "https:/$BASE_URL/v1/posts" \
  -H "Authorization: Bearer $BEARER" \
  -H "Content-Type: application/json" \
  -d '{"description":"created via matching audience"}'
```

## Local development

Unfortunately, AWS SAM does not support Cognito authorizers locally, so you will have to test the endpoints without authorization.

Requirements:
 - Latest AWS CLI
 - On a fresh install I also had AWS SAM, recommended to have latest version of that as well
 - docker

There are two alternative methods:
 - Write tests and run tests and debug from there. Also loads of opportunities to mock.
 - Run `npm run cdk:watch` and test with Postman/Bruno against development AWS environment

## Pipeline

To make the pipeline work, you need to add the following secrets to your GitHub repository. 
If you didn't follow getting started, the pipeline will fail due to the AWS account hardcoded in the CDK stack (`bin/backend.ts`).
GitHub, under Settings -> Secrets and variables -> Actions -> New repository secret:
 - AWS_ACCESS_KEY_ID: your AWS access key id
 - AWS_SECRET_ACCESS_KEY: your AWS secret access key

## How would I have done monitoring if time allowed

 - Most important is to monitor API Gateway latency 
   - I would put the p95 latency < 1,5 seconds
   - Unfortunately, AWS doesn't discriminate warm starts vs cold starts
 - Also on API Gateway I'd monitor the amount of 5xx requests
   -  Alternative: log errors if last 30 min had > 10 logger.error logs
     - I would need to apply more logging in the application to be able to use that
 - Haven't monitored DynamoDB in AWS a lot, but would definitely monitor limits on there
 - Would also set-up monthly/daily AWS Budget to monitor costs
 - I would also make a synthetic monitor doing the get posts endpoint for a user
   - This Synthetic check does need a Cognito Bearer token, thus would require some work
 - I would also make a dashboard with information about: Lambda, API Gateway, DynamoDB and Cognito
   - And later add custom metrics, although these are expensive in CloudWatch