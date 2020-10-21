import express = require('express');

const router:express.Router = express.Router();

router.use('/posts', require('./Posts/BaseRouter'));

module.exports = router;
