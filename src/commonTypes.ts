import {PostVariant} from "./commonEnums";

export type CategoryData = {
    id: number;
    title: string;
    imageURL: string;
}

export type PostData = {
    id: number; // Unique identifier for the post
    title: string; // Title of the post
    description: string; // Brief description of the post
    imageURL: string; // URL of the image associated with the post
    categoryId: number; // ID referencing the category of the post
    date: string; // Publication date of the post in ISO format (YYYY-MM-DD)
    author: string; // Name of the author of the post
    readingTime: string; // Estimated reading time for the post
    variant: PostVariant;
};

