import {Request, Response} from "express";
import {Post} from '../models/post.model';


export default class PostController {

  static async getList(req: Request, res: Response) {
    const post = await Post.find({});
    res.status(200).send(post);
  }

  static async getPost(req: Request, res: Response) {
    const post = await Post.findById(req.params.id);
    res.status(200).send(post);
  }

  static async createPost(req: Request, res: Response) {
    const {date, description} = req.body;

    const post = Post.build({date, description});
    await post.save();
    res.status(201).send(post);
  }

  static async updatePost(req: Request, res: Response) {
    const post = await Post.findByIdAndUpdate(req.params.id);
    res.status(200).send(post);
  }

  static deletePost(req: Request, res: Response) {
    Post.findByIdAndDelete(req.params.id, {}, (err, post) => {
      if (err) {
        console.log(err)
      } else {
        console.log("Deleted : ", post);
        res.status(200).send(post);
      }
    });
  }

}