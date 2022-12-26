import React, { useEffect, MouseEventHandler, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import './Home.scss';
import {
    useAllJokes,
    useJokeCategories,
} from '../../../services/JokeService/Hooks';
import { JokeItem } from './JokeItem';
import Loading from 'components/ui/Loading';
import CategoryTags from 'components/ui/CategoryTags';
import { useQuery } from 'helpers';
import { Categories, Category, Jokes } from 'services/JokeService';

const pageLimit = 15;

const Home: React.FC = () => {
    let jokes: Jokes = [];
    const { categories: categorySearch, ...restQuery } = useQuery();
    const navigate = useNavigate();
    const [categories, isCategoriesLoading] = useJokeCategories();
    const [page, setPage] = useState<number>(1);
    let selectedCategories: Categories = [];
    if (typeof categorySearch === 'string') {
        selectedCategories = categorySearch.split(',');
    }
    const [allJokes, isJokesLoading] = useAllJokes(
        false,
        selectedCategories,
        page,
        pageLimit,
    );
    const isLoading = isCategoriesLoading || isJokesLoading;

    jokes = allJokes;

    const indexedSelectedCategories: { [key: string]: Category } =
        selectedCategories.reduce((cary, category) => {
            cary[category] = category;
            return cary;
        }, {});

    const handleViewMoreClick: MouseEventHandler<HTMLButtonElement> = () => {
        setPage(page + 1);
    };

    const updateCategoriesSearchQuery = (newSelectedCategories: Categories) => {
        const searchQueryObj = {
            ...restQuery,
        };
        if (newSelectedCategories.length > 0) {
            searchQueryObj.categories = newSelectedCategories.join(',');
        }
        let searchQueryString = queryString.stringify(searchQueryObj);
        setPage(1);
        navigate(`?${searchQueryString}`);
    };

    const handleViewAllButtonClick: MouseEventHandler<
        HTMLButtonElement
    > = () => {
        updateCategoriesSearchQuery([]);
    };

    const handleCategoryButtonClick =
        (category: Category): MouseEventHandler<HTMLButtonElement> =>
        () => {
            let newSelectedCategories: Categories = [];
            const catIndex = selectedCategories.findIndex(
                (c) => c === category,
            );
            if (catIndex >= 0) {
                newSelectedCategories = [...selectedCategories];
                newSelectedCategories.splice(catIndex, 1);
            } else {
                newSelectedCategories = [...selectedCategories, category];
            }
            updateCategoriesSearchQuery(newSelectedCategories);
        };

    const isViewMoreShown = !isLoading && jokes.length >= page * pageLimit;

    return (
        <div className="home">
            <div className="home__container">
                {categories.length > 0 && (
                    <div className="home__category">
                        {categories.map((category) => (
                            <button
                                onClick={handleCategoryButtonClick(category)}
                                className={[
                                    'home__category__item',
                                    indexedSelectedCategories[category]
                                        ? 'selected'
                                        : '',
                                ].join(' ')}
                                key={category}
                            >
                                {category}
                            </button>
                        ))}
                        <button
                            onClick={handleViewAllButtonClick}
                            className={[
                                'home__category__item view-all',
                                selectedCategories.length === 0
                                    ? 'selected'
                                    : '',
                            ].join(' ')}
                            key={'view-all'}
                        >
                            View All
                            <i className="icon-full-down-arrow" />
                        </button>
                    </div>
                )}
                <div className="line" />
                <CategoryTags
                    onTagClick={handleCategoryButtonClick}
                    categories={selectedCategories}
                />
                {isLoading && <Loading />}
                <div className="home__joke-list">
                    {jokes.map((joke) => (
                        <JokeItem key={joke.id} joke={joke} />
                    ))}
                </div>
                {isViewMoreShown && (
                    <div className="home__joke-list__view-more">
                        <button
                            className="home__joke-list__view-more__inner"
                            onClick={handleViewMoreClick}
                        >
                            View More
                            <i className="icon-full-down-arrow" />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
