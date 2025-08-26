# Planning

## Done
- [x] set-up project
- [x] add first endpoint
- [x] deploy first handler to AWS
- [x] Add open API spec
- [x] Create Post endpoint with DynamoDB

## Working on

## Backlog
- [ ] Change Post endpoint with Cognito
- [ ] Read Post endpoint
- [ ] Update Post endpoint
- [ ] Delete Post endpoint
- [ ] Add CI/CD
- [ ] Document monitoring/logging

## Things I would change
These are not in scope for the assignment, but suggestions I'd pick up if I were to productionalise this.

- Group the Lambdas in CDK better in a map or some other form, so that I can iterate over them
- Add multi-env support: dev, stg, prd
- Zod models are used throughout the handler and service, we control the database, but ideally you'd use DTOs
