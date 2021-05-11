# Donkey assessment API backend

## Requirements
1. Nodejs
2. Docker

## Description
This API backend allows you to do all basic CRUD operations on posts on a timeline. It also allows you to add comments to a post.

It's mostly covered in tests, it heavily depends on dependency injection, and is mostly wired together in the DI-container.

## Run locally
* `npm start`
  * It will start a MongoDB in a docker container and will run a NodeJS server locally while keeping track of TypeScript changes.
* `npm test`
  * It will run the unit tests

The folder [requests](./requests) contains a file with dummy requests that you're able to execute. Both VSCode as Jetbrains IDEs support those files. It skips the need for PAW or Postman.

Some thoughts:
* I skipped the UML diagram; I really see no use in it as a tried to build it loosely coupled, depending on interfaces.
  Also, I believe you should not need it in small code bases (when you write code properly) and it's not helpfull in large code bases.
* I spend much too much time (~4 hours) on trying to automatically create a MongoDB containing some data when you start the project. I decided to give up on trying to populate the db on boot.

