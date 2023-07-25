import PostModel, { IComment, IFile, IPost } from '../models/post.model';

async function createPost(title: string, author: string, content: string): Promise<IPost> {
    const post = new PostModel({
        title,
        author,
        content,
    });

    try {
        const savedPost = await post.save();
        return savedPost;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

async function getAllPosts(): Promise<IPost[]> {
    try {
        const allPosts: IPost[] = await PostModel.find();

        return allPosts;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

async function getSpecificPost(id: string): Promise<IPost | null> {
    try {
        const specificPost: IPost | null = await PostModel.findById(id);

        if (!specificPost) {
            throw new Error('Post not found.');
        }
        return specificPost;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

async function deleteSpecificPost(id: string): Promise<IPost> {
    try {
        const deletedPost: IPost | null = await PostModel.findByIdAndDelete(id);

        if (!deletedPost) {
            throw new Error('Post not found.');
        }
        return deletedPost;
    } catch (error: any) {
        throw new Error(error.message)
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
    } catch (error: any) {
        throw new Error(error.message)
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
    } catch (error: any) {
        throw new Error(error.message)
    }
}

async function addAttachmentsToPost(id: string, fileName: string, mimeType: string, filePath: string): Promise<IPost> {
    try {
        const post: IPost | null = await PostModel.findById(id).orFail();

        if (!post) {
            throw new Error('Post not found.');
        }
        if (!filePath) {
            throw new Error("There wen't something wrong with uploading the file.");
        }

        const newFile = {
            fileName: fileName,
            mimeType: mimeType,
            path: filePath,
        } as IFile;

        post.attachments.push(newFile);

        const updatedPost = await post.save()
        
        return updatedPost;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export { createPost, getAllPosts, getSpecificPost, deleteSpecificPost, updateSpecificPost, addCommentToPost, addAttachmentsToPost };