import express, { Router, Request, Response } from 'express';
import { createPost, getAllPosts, getSpecificPost, deleteSpecificPost, updateSpecificPost, addCommentToPost } from '../services/post.service';

const router: Router = express.Router();

router.get('/', async (req, res) => {
    try {
        const allPosts = await getAllPosts();
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const allPosts = await getSpecificPost(id);
        res.status(200).json(allPosts)
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { title, author, content } = req.body;
    
    try {
        const newPost = await createPost(title, author, content);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ error: error });
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
      } catch (error) {
        res.status(500).json({ error: 'Failed to update the post.' });
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
    } catch (error) {
        res.status(500).json({ error: error });
    }
});

router.post('/:id/comment', async (req, res) => {
    const id = req.params.id;
    const { author, comment } = req.body;

    try {
        const updatedPost = await addCommentToPost(id, author, comment);
        res.status(200).json({
            "Message": "Successfully added comment to post",
            "Post": updatedPost
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
});


export default router;