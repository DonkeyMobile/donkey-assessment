#!/bin/bash
echo "Importing members..."
mongoimport --username root --password example --authenticationDatabase admin \
  --db donkey --collection members --type csv --headerline /docker-entrypoint-initdb.d/members.csv

echo "Importing groups..."
mongoimport --username root --password example --authenticationDatabase admin \
  --db donkey --collection groups --type csv --headerline /docker-entrypoint-initdb.d/groups.csv

echo "Importing posts..."
mongoimport --username root --password example --authenticationDatabase admin \
  --db donkey --collection posts --type csv --headerline /docker-entrypoint-initdb.d/posts.csv