import express = require('express');

const router:express.Router = express.Router();

router.use('/', require('./PostRouter'));
router.use('/', require('./CommentRouter'));

module.exports = router;
