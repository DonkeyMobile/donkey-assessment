import Layout from "../components/layout/Layout";
import Title from "../components/shared/Title/Title";
import CategoryList from "../components/Categories/CategoryList";
import categoriesJson from "../data/categories/categories.json"
import {CategoryData} from "../commonTypes";
import postsJson from "../data/posts/posts.json"
import {PostData} from "../commonTypes";
import {useState} from "react";
import PostList from "../components/Posts/PostList/PostList";
import {PostVariant} from "../commonEnums";


// Custom hook for filtering posts
function useFilteredPosts(categoryId: number): PostData[] {
    return postsJson.filter(
        (post) =>
            post.categoryId === categoryId && post.variant === PostVariant.STANDARD
    ) as PostData[];
}

function MainPage() {
    const categories: CategoryData[] = categoriesJson;
    const [selectedCategory, setSelectedCategory] = useState<number>(1);

    const trendingPosts = postsJson.filter(
        (post) => post.variant === PostVariant.TRENDING
    ) as PostData[];

    const filteredPosts = useFilteredPosts(selectedCategory);


    return (
        <Layout>
            <section className={"flex flex-col gap-5 -mt-5"}>
                <Title text={"Op dit moment Trending"} level={3} icon={{name: "FaChartLine"}} />
                <PostList posts={trendingPosts} variant={PostVariant.TRENDING} categories={categories}/>
            </section>
            <section className={"flex flex-col gap-5"}>
                <Title text={"Kies een Categorie"} level={3} icon={{name: "MdCategory"}} />
                <CategoryList
                    categoryList={categories}
                    selectedCategory={selectedCategory}
                    onSelectCategory={setSelectedCategory}
                />
            </section>
            <section className={"flex flex-col gap-5"}>
                <Title text={"Laatste berichten"} level={3} icon={{name: "MdViewList"}} />
                <PostList posts={filteredPosts} variant={PostVariant.STANDARD}/>
            </section>
        </Layout>
    );
}

export default MainPage;