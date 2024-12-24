import React from 'react';
import {CategoryData, PostData} from "../../../commonTypes";
import {PostVariant} from "../../../commonEnums";
import Title from "../../shared/Title/Title";

function PostItem({post, category}: { post: PostData, category?: CategoryData }) {

    switch (post.variant) {
        case PostVariant.TRENDING:
            return (
                <section className={"relative aspect-[2/1] z-0 flex flex-col justify-between"}>
                    <img src={post.imageURL} alt={"trending card image"}
                         className={"w-full h-full absolute object-cover rounded-xl z-10"}/>
                    {category &&
                        <section className={"bg-primary p-2 z-20 w-fit rounded-xl m-5"}>
                            <p className={"text-surface"}>{category.title}</p>
                        </section>
                    }
                    <section className={"flex flex-col z-20 m-5 gap-5"}>
                        <Title text={post.title} level={2} className={"text-surface md:text-3xl"}/>
                        <section className={"w-full flex justify-between text-secondary"}>
                            <p>Leestijd: <b>{post.readingTime}</b></p>
                            <p>{post.date}</p>
                        </section>
                    </section>

                </section>
            )
        case PostVariant.STANDARD:
            return (
                <section className={"flex flex-col gap-3 border-2 border-secondary p-3 rounded-lg"}>
                    <span>{post.author}</span>
                    <img src={post.imageURL} alt={"standard card image"} className={"aspect-square object-cover"}/>
                    <Title text={post.title} level={2} className={"card-trending__title"}/>
                    <p className={"h-full"}>{post.description}</p>
                    <hr/>
                    <section className={"flex flex-row justify-between"}>
                        <span>Leestijd: <b>{post.readingTime}</b></span>
                        <span><i>{post.date}</i></span>
                    </section>
                </section>
            )
        default:
            return (
                <p>Not supported</p>
            )

    }
}

export default PostItem;