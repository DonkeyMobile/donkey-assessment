import React from 'react';
import {CategoryData} from "../../commonTypes";
import CategoryItem from "./CategoryItem";

function CategoryList({categoryList, selectedCategory, onSelectCategory}: {categoryList: CategoryData[], selectedCategory: number, onSelectCategory:  React.Dispatch<React.SetStateAction<number>>}) {
    return (
        <section className={"grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 lg:w-3/5"}>
            {categoryList.map((category) => <CategoryItem key={category.id} category={category} isActive={selectedCategory === category.id} onSelect={onSelectCategory}/>)}
        </section>
    );
}

export default CategoryList;