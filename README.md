# Donkey assessment Tim

## Running the application

### Database

The data base can be run locally using docker: `docker compose up -d`.

### Application

The application can be build by executing `npm run build`. And can be started by executing `npm run start`.

### Tests

Tests can be ran by executing `npm run test`. These test use an in memory database so there is no database required.

## Implemented functionalities

- Users
  - Users can be created and deleted
- Posts
  - You can create, update and delete posts
  - Posts can be requested by id
  - You can get the last x amount of post in pages (For a timeline functionality)
  - Posts can have attachments (Attachments can be added when creating a post but can not be updated)
  - When retrieving a post it has the count of comments for that post.
- Comments
  - Comments can be created and deleted
  - All comments by a post can be retrieved by the post id
  - Comments get deleted when the posts gets deleted they belong to.

## Steps and choices

### Steps

1. First I created a initial diagram of the data structure [diagram.md](./diagram.md). I updated this diagram along the way.
2. When i had my initial design i implemented the functionality for Users, Comments and creating, deleting and getting posts.
3. After implementing these functionalities I wrote automated test's for those functionality's and fixed bug's when they came up after testing.
4. Then i implemented functionalities with test's one by one.

### Database

The data is stored in 3 collections. I made the choice to store the comments in a separate collection so that the post does not need to be updated every time a comment is posted. The comment has a reference to the post.

The meta data for attachments are stored in the post. Because this information does not have to update frequently. And it makes it less complicated than storing the information for attachments in a other collection.

### Testing

For testing I used Jest. I tried to cover the happy flow but i also tried to test all the error states. To make testing reliable I made used of a [test fixture](./src/test/setup.ts) with an in memory database. So that every test has a clean starting point.

For manual testing I used a [.http file](./test.http).
