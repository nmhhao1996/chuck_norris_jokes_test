import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Joke } from 'services/JokeService';
import { useJokeDetailRoute } from 'helpers/hooks';

export interface JokeSelectorItemProps {
    joke: Joke;
}

const JokeSelectorItem: React.FC<JokeSelectorItemProps> = ({ joke }) => {
    const detailRoute = useJokeDetailRoute(joke);
    const location = useLocation();
    return (
        <Link
            to={detailRoute}
            state={{
                from: `${location.pathname}${location.search}`,
            }}
            className="banner__search__selector__item"
            key={joke.id}
        >
            <i className="icon-green-light" />
            <span>{joke.value}</span>
        </Link>
    );
};

export default JokeSelectorItem;
