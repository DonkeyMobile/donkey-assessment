const PostModel = require('../Model/Post');
const CommentModel = require('../Model/Comment');

module.exports = {
    getAllFor: async(postId: String) => {
        let post = await PostModel.findById(postId).populate('comments').exec();

        return post.comments;
    },
    create: async(postId: String, description: String) => {
        let post = await PostModel.findById(postId);

        let comment = await new CommentModel({
            description: description,
            post: post._id
        }).save();

        post.comments.push(comment);
        await post.save();

        return comment;
    },
    remove: async(commentId: String) => {
        await CommentModel.findByIdAndDelete(commentId);
    }
};
