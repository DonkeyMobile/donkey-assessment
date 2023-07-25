import PostModel, { IComment, IFile, IPost } from '../models/post.model';
import { CustomError } from "../utils/customErrorHandling"

var regex = /^[a-f\d]{24}$/i

export async function create(title: string, author: string, content: string): Promise<IPost> {
    const post = new PostModel({
        title,
        author,
        content,
    });

    try {
        const savedPost = await post.save();
        return savedPost;
    } catch (error) {
        throw error;
    }
}

export async function getAll(): Promise<IPost[]> {
    try {
        const allPosts: IPost[] = await PostModel.find();

        return allPosts;
    } catch (error) {
        throw error;
    }
}

export async function getWithId(id: string): Promise<IPost | null> {

    if (regex.test(id)) {
        try {
            const specificPost: IPost | null = await PostModel.findById(id);

            if (!specificPost) {
                throw new CustomError("NotFoundError", `Post with ${id} not found.`, 404)
            }
            return specificPost;
        } catch (error) {
            throw error;
        }
    } else {
        throw new CustomError("TypeError", `Id (${id}) not valid.`, 500)
    }
}

export async function deleteWithId(id: string): Promise<IPost> {
    if (regex.test(id)) {
        try {
            const deletedPost: IPost | null = await PostModel.findByIdAndDelete(id);

            if (!deletedPost) {
                throw new CustomError("NotFoundError", `Post with ${id} not found.`, 404)
            }
            return deletedPost;
        } catch (error) {
            throw error;
        }
    } else {
        throw new CustomError("TypeError", `Id (${id}) not valid.`, 500)
    }
}

export async function updateWithId(id: string, title: string, content: string): Promise<IPost> {
    if (regex.test(id)) {
        const updatedAt = Date.now()
        try {
            const updatedPost: IPost | null = await PostModel.findByIdAndUpdate(id, { title, content, updatedAt }, { new: true });

            if (!updatedPost) {
                throw new CustomError("NotFoundError", `Post with ${id} not found.`, 404)
            }
            return updatedPost;
        } catch (error) {
            throw error;
        }
    } else {
        throw new CustomError("TypeError", `Id (${id}) not valid.`, 500)
    }
}

export async function addComment(id: string, author: string, comment: string): Promise<IPost> {
    if (regex.test(id)) {
        try {

            const post: IPost | null = await PostModel.findById(id);

            if (!post) {
                throw new CustomError("NotFoundError", `Post with ${id} not found.`, 404)
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
            throw error;
        }
    } else {
        throw new CustomError("TypeError", `Id (${id}) not valid.`, 500)
    }
}

export async function addAttachment(id: string, fileName: string, mimeType: string, filePath: string): Promise<IPost> {
    if (regex.test(id)) {
        try {
            const post: IPost | null = await PostModel.findById(id);

            if (!post) {
                throw new CustomError("NotFoundError", `Post with ${id} not found.`, 404)
            }
            if (!filePath) {
                throw new CustomError("ServerError", "There wen't something wrong with uploading the file.", 500);
            }

            const newFile = {
                fileName: fileName,
                mimeType: mimeType,
                path: filePath,
            } as IFile;

            post.attachments.push(newFile);

            const updatedPost = await post.save()

            return updatedPost;
        } catch (error) {
            throw error;
        }
    } else {
        throw new CustomError("TypeError", `Id (${id}) not valid.`, 500)
    }
}