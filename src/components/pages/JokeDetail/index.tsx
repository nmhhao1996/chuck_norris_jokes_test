import React from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import './JockDetail.scss';
import { useAllJokes, useJokeByID } from 'services/JokeService/Hooks';
import Loading from 'components/ui/Loading';
import CategoryTags from 'components/ui/CategoryTags';
import { useJokeDetailRoute } from 'helpers';
import { Joke } from 'services/JokeService';

interface ChangeJokeActionButtonProps {
    type: 'prev' | 'next';
    joke: Joke;
}

const ChangeJokeActionButton: React.FC<ChangeJokeActionButtonProps> = ({
    type,
    joke,
}) => {
    const detailRoute = useJokeDetailRoute(joke);
    return (
        <Link to={detailRoute} className={`button button-${type}`}>
            {type === 'next' && (
                <>
                    <span>NEXT JOKE</span>
                    <i className="icon-right-arrow" />
                </>
            )}
            {type === 'prev' && (
                <>
                    <i className="icon-left-arrow" />
                    <span>PREV. JOKE</span>
                </>
            )}
        </Link>
    );
};

interface TopListItemProps {
    joke: Joke;
}
const TopListItem: React.FC<TopListItemProps> = ({ joke }) => {
    const detailRoute = useJokeDetailRoute(joke);
    return (
        <li key={joke.id}>
            <Link
                to={detailRoute}
                state={{
                    from: `${location.pathname}${location.search}`,
                }}
            >
                {joke.value}
            </Link>
        </li>
    );
};

const JokeDetail: React.FC = () => {
    const location = useLocation();
    const { id, search } = useParams();
    const [joke, isLoading, prevJoke, nextJoke] = useJokeByID(id, search);
    const [allJokes] = useAllJokes(false, [], 1, 10);
    const backPath = location.state?.from || '/';
    return (
        <div className="joke-detail">
            <div className="joke-detail__container">
                <Link to={backPath} className="back-button">
                    <i className="icon-left-arrow" />
                </Link>

                <div className="joke-detail__content">
                    <div className="joke-detail__content__left">
                        {isLoading && <Loading />}
                        {!isLoading && (
                            <>
                                <div className="joke-detail__item">
                                    <div className="joke-detail__item__header">
                                        <CategoryTags
                                            categories={
                                                joke.categories.length
                                                    ? joke.categories
                                                    : ['Uncategorized']
                                            }
                                        />
                                        <div className="line" />
                                    </div>
                                    <p>{joke.value}</p>
                                </div>
                                <div className="joke-detail__actions">
                                    <div className="favorite-action-group">
                                        <div className="button-wrapper">
                                            <button className="button button-like">
                                                <i className="icon-like" />
                                                <span>10</span>
                                            </button>
                                        </div>
                                        <div className="button-wrapper">
                                            <button className="button button-dislike">
                                                <i className="icon-dislike" />
                                                <span>10</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="change-joke-action-group">
                                        {!!prevJoke && (
                                            <ChangeJokeActionButton
                                                joke={prevJoke}
                                                type="prev"
                                            />
                                        )}
                                        {!!nextJoke && (
                                            <ChangeJokeActionButton
                                                joke={nextJoke}
                                                type="next"
                                            />
                                        )}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                    <div className="joke-detail__content__right">
                        <h5>THE TOP 10 JOKES THIS WEEK</h5>
                        <ul>
                            {allJokes.map((joke) => (
                                <TopListItem key={joke.id} joke={joke} />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JokeDetail;
