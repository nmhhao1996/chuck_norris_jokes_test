import React from 'react';
import uniq from 'lodash/uniq';
import './CategoryTags.scss';
import { Categories, Category } from 'services/JokeService';

export interface CategoryTagProps {
    children: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const CategoryTag: React.FC<CategoryTagProps> = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className={`category-tags__item ${children.toLowerCase()}`}>
            • {children}
        </button>
    );
};

export interface CategoryTagsProps {
    categories: Categories;
    onTagClick?: (
        category: Category,
    ) => React.MouseEventHandler<HTMLButtonElement>;
}
const CategoryTags: React.FC<CategoryTagsProps> = ({
    categories,
    onTagClick,
}) => {
    const categoryList: Categories = uniq(categories);
    return (
        <div className="category-tags">
            {categoryList.map((category) => (
                <CategoryTag
                    onClick={onTagClick ? onTagClick(category) : undefined}
                    key={category}
                >
                    {category}
                </CategoryTag>
            ))}
        </div>
    );
};
export default CategoryTags;
