# Donkey Assessment

Welcome to this assessment!

## Requirements
1.	You must be able to run everything locally.
2.	Use the provided Dockerized MongoDB (source) and MySQL (analytics store).
3.	You may use any language or framework you prefer for transformations (Python, Node.js, Java, Go, etc.).
4.	Clean, maintainable, well-structured code.
5.	Clear documentation on how to run the pipeline and how the data is modeled.

## Description

### 1. Build a mini data platform pipeline

Using the provided MongoDB as the source, build a pipeline that extracts data and loads it into MySQL.

### 2. Provide analytics queries

Write a set of SQL queries that will be used by other developers to run analytics.
At minimum include:
1.	Which group is the most active?
(Based on number of posts.)
2.	Which member is the most active?
(Post count or your own metric.)
3.	A query of your choice that demonstrates the usefulness of your data model

### 3. Deliver as a Pull Request

## Context

We provide a dockerized environment that includes:
•	MongoDB – already populated with members, groups and posts
•	MySQL – initially empty, ready for your analytics schema

You can start the environment with:

`docker compose up -d`

## Final Notes

Happy coding! 🤓
If you have any questions during the assessment, feel free to reach out.