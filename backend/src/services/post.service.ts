import PostModel, { IComment, IPost } from '../models/post.model';

async function createPost(title: string, author: string, content: string): Promise<IPost> {
    const post = new PostModel({
        title,
        content,
    });

    try {
        const savedPost = await post.save();
        return savedPost;
    } catch (error) {
        throw new Error('Failed to create the post.');
    }
}

async function getAllPosts(): Promise<IPost[]> {
    try {
        const allPosts: IPost[] = await PostModel.find();

        return allPosts;
    } catch (error) {
        throw new Error('Failed to retrieve posts.')
    }
}

async function getSpecificPost(id: string): Promise<IPost | null> {
    try {
        const specificPost: IPost | null = await PostModel.findById(id);

        if (!specificPost) {
            throw new Error('Post not found.');
        }
        return specificPost;
    } catch (error) {
        throw new Error('Failed to retrieve post.')
    }
}

async function deleteSpecificPost(id: string): Promise<IPost> {
    try {
        const deletedPost: IPost | null = await PostModel.findByIdAndDelete(id);

        if (!deletedPost) {
            throw new Error('Post not found.');
        }
        return deletedPost;
    } catch (error) {
        throw new Error('Failed to retrieve post.')
    }
}

async function updateSpecificPost(id: string, title: string, content: string): Promise<IPost> {
    const updatedAt = Date.now()
    try {
        const updatedPost: IPost | null = await PostModel.findByIdAndUpdate(id, { title, content, updatedAt }, { new: true });

        if (!updatedPost) {
            throw new Error('Post not found.');
        }
        return updatedPost;
    } catch (error) {
        throw new Error('Failed to retrieve post.')
    }
}

async function addCommentToPost(id: string, author: string, comment: string): Promise<IPost> {
    try {

        const post: IPost | null = await PostModel.findById(id);

        if (!post) {
            throw new Error('Post not found.');
        }

        const newComment = {
            author: author,
            content: comment,
            createdAt: new Date(),
        } as IComment;

        post.comments.push(newComment);

        const updatedPost = await post.save();

        return updatedPost;
    } catch (error) {
        throw new Error('Failed to retrieve post.')
    }
}

export { createPost, getAllPosts, getSpecificPost, deleteSpecificPost, updateSpecificPost, addCommentToPost };