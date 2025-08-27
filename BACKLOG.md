# Planning

## Done
- [x] set-up project
- [x] add first endpoint
- [x] deploy first handler to AWS
- [x] Add open API spec
- [x] Create Post endpoint with DynamoDB
- [x] Change Post endpoint with Cognito
- [x] Read Post endpoint
- [x] Add CI/CD

## Working on
- [ ] Enable SAM: unfortunately, I couldn't get SAM to play well with Cognito

## Backlog
- [ ] Update Post endpoint
- [ ] Delete Post endpoint
- [ ] Document monitoring/logging

## Things I would change
These are not in scope for the assignment, but suggestions I'd pick up if I were to productionalise this.

- Group the Lambdas in CDK better in a map or some other form, so that I can iterate over them
- Add multi-env support: dev, stg, prd
- Zod models are used throughout the handler and service, we control the database, but ideally you'd use separate models
- Add non-happy scenarios (400/500) to OpenAPI specification
- Add generic error handling (catch on the handler)
- Move critical resources such as Cognito pool outside backend stack
- Research best practices to validate if I secured Cognito well
- Unit tests/mocking/integration tests
- Use proper OICD if staying in GitHub Actions
  - Alternative: Could move to CodeBuild for increased security
- Local SAM should point to local DynamoDB
- Move logs of Lambda to the path /posts/create-post etc in CloudWatch Logs
