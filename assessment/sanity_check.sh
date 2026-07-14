#!/usr/bin/env bash
set -uo pipefail

BASE="http://localhost:3000"

echo "== Health check =="
curl -i "$BASE/health"
echo -e "\n"

echo "== Create a post (no attachments) =="
curl -i -X POST "$BASE/api/posts" \
  -F "date=2026-07-14" \
  -F "description=My first post"
echo -e "\n"

echo "== Create a post with file attachments =="
POST_JSON=$(curl -s -X POST "$BASE/api/posts" \
  -F "date=2026-07-14" \
  -F "description=Post with attachments" \
  -F "files=@./uploads/1784059362665-doc.pdf")
echo "$POST_JSON"
echo -e "\n"

POST_ID=$(echo "$POST_JSON" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Using POST_ID=$POST_ID"
echo -e "\n"

echo "== Missing description -> 400 validation error =="
curl -i -X POST "$BASE/api/posts" \
  -F "date=2026-07-14"
echo -e "\n"

echo "== List all posts =="
curl -i "$BASE/api/posts"
echo -e "\n"

echo "== Get a single post by id =="
curl -i "$BASE/api/posts/$POST_ID"
echo -e "\n"

echo "== Invalid id format -> 400 =="
curl -i "$BASE/api/posts/not-a-valid-id"
echo -e "\n"

echo "== Update a post =="
curl -i -X PUT "$BASE/api/posts/$POST_ID" \
  -H "Content-Type: application/json" \
  -d '{"description": "Updated description"}'
echo -e "\n"

echo "== Update with empty body -> 400 (at least one field required) =="
curl -i -X PUT "$BASE/api/posts/$POST_ID" \
  -H "Content-Type: application/json" \
  -d '{}'
echo -e "\n"

echo "== Create a comment =="
COMMENT_JSON=$(curl -s -X POST "$BASE/api/posts/$POST_ID/comments" \
  -H "Content-Type: application/json" \
  -d '{"description": "Nice post!", "author": "Alice"}')
echo "$COMMENT_JSON"
echo -e "\n"

COMMENT_ID=$(echo "$COMMENT_JSON" | grep -o '"_id":"[^"]*"' | head -1 | cut -d'"' -f4)
echo "Using COMMENT_ID=$COMMENT_ID"
echo -e "\n"

echo "== Missing author -> 400 =="
curl -i -X POST "$BASE/api/posts/$POST_ID/comments" \
  -H "Content-Type: application/json" \
  -d '{"description": "Missing author field"}'
echo -e "\n"

echo "== List comments for a post =="
curl -i "$BASE/api/posts/$POST_ID/comments"
echo -e "\n"

echo "== Update a comment =="
curl -i -X PUT "$BASE/api/posts/$POST_ID/comments/$COMMENT_ID" \
  -H "Content-Type: application/json" \
  -d '{"description": "Edited comment"}'
echo -e "\n"

echo "== Delete a comment =="
curl -i -X DELETE "$BASE/api/posts/$POST_ID/comments/$COMMENT_ID"
echo -e "\n"

echo "== Delete a post =="
curl -i -X DELETE "$BASE/api/posts/$POST_ID"
echo -e "\n"

echo "== Unknown route -> 404 =="
curl -i "$BASE/api/unknown"
echo -e "\n"
