# Donkey Timeline API

Node.js + TypeScript + MongoDB API for creating, reading, updating and deleting timeline posts with comments and file attachments.

## Stack
- Node.js / Express
- TypeScript
- MongoDB / Mongoose
- Jest + Supertest + mongodb-memory-server (unit & integration tests)
- Multer (attachment uploads)

## Project structure
```
src/
  config/         # environment configuration
  db/             # database connection
  models/         # Mongoose schemas (Post, Comment)
  controllers/    # request handlers
  routes/         # Express routers
  app.ts          # Express app setup
  server.ts       # entry point, bootstraps DB + server
tests/
  unit/           # model-level unit tests
  integration/    # API tests using an in-memory MongoDB
```

## Getting started

1. Install dependencies:
   ```
   npm install
   ```
2. Copy `.env.example` to `.env` and adjust if needed.
3. Start MongoDB locally, e.g. via Docker:
   ```
   docker compose up -d
   ```
4. Run the server in dev mode:
   ```
   npm run dev
   ```
5. Build & run for production:
   ```
   npm run build
   npm start
   ```

## Tests

Tests use `mongodb-memory-server`, so no running database is required:
```
npm test
```

## API overview

| Method | Path                                | Description                  |
|--------|--------------------------------------|-------------------------------|
| GET    | /api/posts                           | List posts                   |
| POST   | /api/posts                           | Create post                  |
| GET    | /api/posts/:id                       | Get post by id (with comments)|
| PUT    | /api/posts/:id                       | Update post                  |
| DELETE | /api/posts/:id                       | Delete post (and its comments)|
| POST   | /api/posts/:id/attachments           | Upload attachments (multipart `files`) |
| GET    | /api/posts/:postId/comments          | List comments for a post     |
| POST   | /api/posts/:postId/comments          | Add comment to a post        |
| PUT    | /api/posts/:postId/comments/:id      | Update comment               |
| DELETE | /api/posts/:postId/comments/:id      | Delete comment               |
