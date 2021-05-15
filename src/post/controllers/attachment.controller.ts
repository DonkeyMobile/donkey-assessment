import {Request, Response} from "express";
import {Post} from '../models/post.model';
import minioClient from "../../common/services/minio.service";
import {Readable as ReadableStream} from "stream";
import Busboy = require("busboy");
import {ItemBucketMetadata} from "minio";
import {Attachment} from "../models/attachment.model";

export default class AttachmentController {

  static async uploadAttachment(req: Request, res: Response) {
    let postid = req.params.postid;

    let busboy = new Busboy({headers: req.headers});
    busboy.on('file', function (fieldname: string, file: ReadableStream, filename: string, encoding: string, mimetype: string) {
      minioClient.bucketExists(postid).then(function (exist) {
        if (!exist) {
          minioClient.makeBucket(postid, 'eu-central-1', function (error) {
            if (error) res.status(500);
          })
        }
      });
      console.log("putObject: "+fieldname);

      let metaData: ItemBucketMetadata = {'x-amz-acl': 'public-read'};
      minioClient.putObject(postid, filename, file, metaData);

      let url = 'localhost:9000/' + postid + '/' + filename;
      const attachment = Attachment.build({filename, url});

      Post.findByIdAndUpdate(postid, {
        $push: {attachment: attachment}
      }, function (err, post) {
        if (err) console.log(err);
      });

    });

    busboy.on('finish', function () {
      res.writeHead(200, {'Connection': 'close'});
      res.end("That's all folks!");
    });

    req.pipe(busboy);
  }

  static deleteAttachment(req: Request, res: Response) {
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