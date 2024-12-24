import React from 'react';
import PostItem from "../PostItem/PostItem";
import {CategoryData, PostData} from "../../../commonTypes";
import {PostVariant} from "../../../commonEnums";

function PostList({posts, variant, categories}: { posts: PostData[], variant: PostVariant, categories?: CategoryData[]}) {
    return (
        <section className={`grid card-list-${variant}`}>
            {posts.map((post) => <PostItem key={post.id} post={post} category={categories?.find((category) => category.id === post.categoryId)}/>)}
        </section>
    );
}

export default PostList;