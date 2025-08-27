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

## Pipeline

To make the pipeline work, you need to add the following secrets to your GitHub repository. 
If you didn't follow getting started, the pipeline will fail due to the AWS account hardcoded in the CDK stack (`bin/backend.ts`).
GitHub, under Settings -> Secrets and variables -> Actions -> New repository secret:
 - AWS_ACCESS_KEY_ID: your AWS access key id
 - AWS_SECRET_ACCESS_KEY: your AWS secret access key