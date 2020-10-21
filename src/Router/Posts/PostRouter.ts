import express = require('express');
import _ = require('lodash');

const router:express.Router = express.Router();
const PostModel = require('./../../Model/Post');
const FileModel = require('./../../Model/File');

router.get('/', async function(request, response) {
    try {
        response.json(await PostModel.find().exec());
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/', async function(request, response) {
    try {
        let attachments: Array<any> = [];
        if (request.files) {
            _.forEach(request.files, function(file) {
                if (Array.isArray(file)) {
                    throw 'Please send files with separate keys';
                }

                attachments.push(new FileModel({type: file.mimetype, data: file.data}));
            });
        }

        let newPost = new PostModel({description: request.body.description, date: new Date(), attachments: attachments});
        response.json(await newPost.save());
    } catch (error) {
        response.status(500).send(error);
    }
});

router.post('/:post_id', function(request, response) {
    try {
        let postId:string = request.params.post_id;

        PostModel.findById(postId).exec().then(function(post:typeof PostModel) {
            post.description = request.body.description;
            post.save().then(function() {
                response.send(post);
            }, function() { throw 'post is not saved' });
        }, function() { throw 'post does not exist' });
    } catch (error) {
        response.status(500).send(error);
    }
});

router.delete('/:post_id', async function(request, response) {
    try {
        let postId:string = request.params.post_id;
        await PostModel.findByIdAndDelete(postId);

        response.send('Post ' + postId + ' deleted');

    } catch (error) {
        response.status(500).send(error);
    }
});

module.exports = router;
