# Donkey assessment

Welcome to this assessment.

## Requirements
1. Docker
2. Airflow
3. Must be possible to run the locally

## Description
1. Using Apache Airflow write a DAG to process data from MongoDB to MySQL.
2. Write a SQL query to retrieve which group is the most active and which user is the most active.
3. Make a pull request containing the DAG and SQL query, and assign the PR to us.

## Context
To help you start we have prepared a dockerized MongoDb and a dockerized MySQL database.
You can find the docker-compose file in the root of this repository.
Start the docker containers with the following command:

```bash
docker-compose up -d
```

The Mongo database is already populated with data. The MySQL database is empty.

Happy coding! 🤓
If any questions, let us know.
