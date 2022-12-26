import React, { MouseEventHandler } from 'react';
import { useJokesSearch } from 'services/JokeService/Hooks';
import JokeSelectorItem from './JokeSelectorItem';

export interface JokeSelectorProps {
    searchText: string;
    onMouseOver?: MouseEventHandler<HTMLDivElement>;
    onMouseOut?: MouseEventHandler<HTMLDivElement>;
}

const JokeSelector: React.FC<JokeSelectorProps> = ({
    searchText,
    onMouseOver,
    onMouseOut,
}) => {
    const [jokes] = useJokesSearch(searchText.length >= 3 ? searchText : '');
    if (jokes.length === 0) {
        return null;
    }
    return (
        <>
            <div className="banner__search__selector">
                <div
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    className="banner__search__selector__inner"
                >
                    {jokes.map((joke) => (
                        <JokeSelectorItem key={joke.id} joke={joke} />
                    ))}
                </div>
            </div>
            <div className="banner__search__selector-triangle"></div>
        </>
    );
};

export default JokeSelector;
