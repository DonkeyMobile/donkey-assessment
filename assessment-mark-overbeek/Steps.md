# Steps during assessment

## UML

A user can post 0 or more posts on a timeline
A post can have 0 or more attachments
A post can have 0 or more comments
Only the post class has all CRUD methods.

## MongoDB

Not using a relational database was new to me. I choosed to store the documents(records) in seperate collections with foreign key relations to avoid redundancy, altough it is also possible to store the data nested and redundant. I prevented storing the data nested because if something is updated in a collection you also have to update the same data that could be nested in another collection. Coming at the end of the assessment I realised that it might be better to store comments and attachments directly on the post collection. Therefore I embedded the comments of a post in the post collection. The uploading of attachments are however still kept in a seperate api because a form data api is needed to upload the file.

## Typescript

Made use of Typescript as it was one of the requirements.
Tried to keep the validation of fields in the type script schema as much as possible.

## Unit testing

I found Jest is a common tool to execute unit testing. I did not get it working due to technical difficulties. ESModules and CommonJS where excluding each other. When I choosed ESModules the server.js ran without errors, but Jest was not working. If the .ts files where compiled to CommonJS Jest was working fine but server.js had errors running. Spending a lot of time on finding out what the problem was I decided to use a manual test file instead of using Jest. The testfile is in dist/tests/createPostWithCleanup.js
For testing the seperate api's I used Postman.

## Use of AI

I made use of AI for fast development in a programming language I do not know very well yet. I tried to keep the code clean and skip things I do not understand.
