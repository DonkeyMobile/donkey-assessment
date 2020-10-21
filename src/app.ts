import express = require('express');

const router:express.Router = require('./Router/BaseRouter');
const app:express.Application = express();
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');

app.use(fileUpload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', router);

module.exports = app;
