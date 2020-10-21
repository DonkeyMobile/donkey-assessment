import express = require('express');

const router:express.Router = express.Router();

const CommentRepository = require('../../Repository/CommentRepository');

router.get('/:post_id/comments', async function(request, response) {
    let postId:string = request.params.post_id;

    try {
        response.json(await CommentRepository.getAllFor(postId));
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/:post_id/comments', async function(request, response) {
    let postId:string = request.params.post_id;

    try {
        response.json(await CommentRepository.create(postId, request.body.description));
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/:post_id/comments/:comment_id', async function(request, response) {
    let commentId:string = request.params.comment_id;

    try {
        await CommentRepository.remove(commentId);

        response.send('Comment ' + commentId + ' deleted');
    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;
