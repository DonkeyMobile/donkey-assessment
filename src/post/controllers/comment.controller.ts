import {Request, Response} from "express";
import {Post} from '../models/post.model';
import {Comment} from '../models/comment.model';


export default class CommentController {

  static async createComment(req: Request, res: Response) {
    const {name, text} = req.body;
    const comment = Comment.build({name, text});

    Post.findByIdAndUpdate(req.params.postid, {
      $push: {comments: comment}
    }, function (err, post) {
      if (err) console.log(err);
      res.send(post);
    })
  }

  static async updateComment(req: Request, res: Response) {
    const {name, text} = req.body;

    Post.findOneAndUpdate(
        {"_id": req.params.postid, "comments._id": req.params.commentid},
        {
          $set: {
            "comments.$.name": name,
            "comments.$.text": text
          }
        },
        null,
        function (err, post) {
          if (err) console.log(err);
          res.send(post);
        });
  }

  static deleteComment(req: Request, res: Response) {
    Post.updateOne(
        {"_id": req.params.postid},
        {
          $pull: {"comments": {"_id": req.params.commentid}}
        },
        null,
        function (err, post) {
          if (err) console.log(err);
          res.send(post);
        }
    );
  }

}