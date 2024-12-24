import React from 'react';
import {CategoryData} from "../../commonTypes";
import Title from "../shared/Title/Title";


function CategoryItem({category, isActive, onSelect}: {category: CategoryData, isActive: boolean, onSelect: React.Dispatch<React.SetStateAction<number>>}) {
    return (
        <button className={`flex flex-col items-center justify-center hover:scale-105 p-3 border-2 rounded-xl ${isActive ? 'border-primary shadow' : 'border-secondary'}`} onClick={() => onSelect(category.id)}>
            <img src={category.imageURL}  alt={"category image"} className={"h-16 w-aut"}/>
            <Title text={category.title} level={3} className={"w-full center"} />
        </button>
    );
}

export default CategoryItem;