import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useJokeDetailRoute } from 'helpers/hooks';
import { Joke } from 'services/JokeService';
import CategoryTags from 'components/ui/CategoryTags';

export interface JokeItemProps {
    joke: Joke;
}

export const JokeItem: React.FC<JokeItemProps> = ({ joke }) => {
    const detailRoute = useJokeDetailRoute(joke);
    const location = useLocation();
    return (
        <div className="home__joke-list__item">
            <a href="#" className="home__joke-list__item__header">
                <CategoryTags
                    categories={
                        joke.categories.length
                            ? joke.categories
                            : ['Uncategorized']
                    }
                />
            </a>
            <div className="home__joke-list__item__content">
                <p>{joke.value}</p>
            </div>
            <div className="home__joke-list__item__footer">
                <Link
                    to={detailRoute}
                    state={{
                        from: `${location.pathname}${location.search}`,
                    }}
                    className="home__joke-list__item__footer__action"
                >
                    <span>SEE STATS</span>
                    <i className="icon-full-right-arrow" />
                </Link>
            </div>
        </div>
    );
};
