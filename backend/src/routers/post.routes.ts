import express, { Router, Request, Response } from 'express';
import multer from 'multer';
import { createPost, getAllPosts, getSpecificPost, deleteSpecificPost, updateSpecificPost, addCommentToPost, addAttachmentsToPost } from '../services/post.service';

const router: Router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.get('/', async (req, res) => {
    try {
        const allPosts = await getAllPosts();
        res.status(200).json(allPosts)
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const allPosts = await getSpecificPost(id);
        res.status(200).json(allPosts)
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { title, author, content } = req.body;
    
    try {
        const newPost = await createPost(title, author, content);
        res.status(201).json(newPost);
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { title, content } = req.body;

    try {
        const updatedPost = await updateSpecificPost(id, title, content);
        res.status(200).json({
            "Message": "Successfully updated post",
            "Post": updatedPost
        });
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const deletedPost = await deleteSpecificPost(id);
        res.status(200).json({
            "Message": "Successfully deleted post",
            "Post": deletedPost
        })
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

router.post('/:id/comment', async (req, res) => {
    const id = req.params.id;
    const { author, comment } = req.body;

    console.log(author)
    try {
        const updatedPost = await addCommentToPost(id, author, comment);
        res.status(200).json({
            "Message": "Successfully added comment to post",
            "Post": updatedPost
        })
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

router.post('/:id/attachment', upload.single('file'), async (req, res) => {
    const id = req.params.id;

    const filePath = req.file?.path;
    const fileName = req.file?.filename;
    const mimeType = req.file?.mimetype;

    try {
        if (filePath && fileName && mimeType) {
            const updatedPost = await addAttachmentsToPost(id, fileName, mimeType, filePath);
            res.status(200).json({
                "Message": "Successfully added comment to post",
                "Post": updatedPost
            })
        } else {
            throw new Error("There wen't something wrong with converting the file to string path.")
        }
    } catch (error: any) {
        res.status(500).json({ "error": error.message });
    }
});

export default router;