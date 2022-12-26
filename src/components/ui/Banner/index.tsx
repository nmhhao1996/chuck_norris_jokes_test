import React, { useState, FocusEventHandler, MouseEventHandler } from 'react';
import debounce from 'lodash/debounce';
import './Banner.scss';
import JokeSelector from './JokeSelector';
import { useQuery } from 'helpers/hooks';
import { useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const Banner: React.FC = () => {
    const query = useQuery();
    const { search } = query;
    let searchText: string = '';
    if (!Array.isArray(search)) {
        searchText = search;
    }
    const navigate = useNavigate();
    const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
    const [isChoosing, setIsChoosing] = useState<boolean>(false);

    const debouncedSetSearchText = debounce((value: string) => {
        const searchStr = queryString.stringify({
            ...query,
            search: value,
        });
        navigate('?' + searchStr);
    }, 500);

    const handleSearchChange: FocusEventHandler<HTMLInputElement> = (e) => {
        debouncedSetSearchText(e.target.value);
    };
    const handleSearchFocus: FocusEventHandler<HTMLInputElement> = () => {
        setIsSearchFocused(true);
    };
    const handleSearchBlur: FocusEventHandler<HTMLInputElement> = () => {
        setIsSearchFocused(false);
    };
    const handleSelectorMouseOver: MouseEventHandler = () => {
        setIsChoosing(true);
    };
    const handleSelectorMouseOut: MouseEventHandler = () => {
        setIsChoosing(false);
    };

    const searchButtonIcon: string = isSearchFocused
        ? 'icon-search-dark'
        : 'icon-search-light';

    const showSelector: boolean = isSearchFocused || isChoosing;
    return (
        <div className="banner">
            <h1>The Joke Bible</h1>
            <h3>Daily Laughs for you and yours</h3>
            <div className="banner__search">
                <input
                    placeholder="How can we make you laugh today"
                    onFocus={handleSearchFocus}
                    onBlur={handleSearchBlur}
                    onChange={handleSearchChange}
                    defaultValue={searchText}
                />
                <button>
                    <i className={searchButtonIcon} />
                </button>
                {showSelector && (
                    <JokeSelector
                        searchText={searchText}
                        onMouseOut={handleSelectorMouseOut}
                        onMouseOver={handleSelectorMouseOver}
                    />
                )}
            </div>
        </div>
    );
};

export default Banner;
