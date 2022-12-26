import React, { DependencyList } from 'react';
import {
    JokeServiceContext,
    JokeServiceInterface,
    Categories,
    Jokes,
    Joke,
} from './JokeService';

const cachedAllJockes: {
    [key: string]: Joke;
} = {};

const allJockes: Jokes = [];

const cachedCategories: Categories = [];

export function useJokeService(): JokeServiceInterface {
    return React.useContext(JokeServiceContext);
}

function useService<T>(
    apiCallback: (jokeService: JokeServiceInterface) => Promise<T>,
    deps: DependencyList = [],
): [T, boolean] {
    const jokeService = useJokeService();
    const [items, setItems] = React.useState<T>([] as T);
    const [loading, setLoading] = React.useState<boolean>(true);
    React.useEffect(() => {
        setLoading(true);
        apiCallback(jokeService).then((items) => {
            setItems(items);
            setLoading(false);
        });
    }, deps);
    return [items, loading];
}

export function useJokeCategories(): [Categories, boolean] {
    const [items, isLoading] = useService<Categories>(async function (
        jokeService,
    ) {
        if (cachedCategories.length) {
            return cachedCategories;
        }
        return await jokeService.getCategories();
    });

    if (!isLoading) {
        cachedCategories.splice(0, items.length, ...items);
    }
    return [items, isLoading];
}

function cacheJokes(jokes: Jokes) {
    jokes.forEach((joke) => {
        cachedAllJockes[joke.id] = joke;
    });
}

export function useJokesSearch(search: string = ''): [Jokes, boolean] {
    const [jokes, isLoading] = useService<Jokes>(
        async function (jokeService) {
            if (!search) {
                return [] as Jokes;
            }
            const data = await jokeService.getJokes(search);
            return data.result;
        },
        [search],
    );

    if (!isLoading) {
        cacheJokes(jokes);
    }

    return [jokes, isLoading];
}

function getPaginatedJokes(jokes: Jokes, page?: number, limit: number = 15) {
    let newJokes = jokes;
    if (page >= 1) {
        let end = page * limit;
        if (jokes.length < end) {
            end = jokes.length;
        }
        newJokes = jokes.slice(0, end);
        return newJokes;
    }
}

export function useAllJokes(
    refetch: boolean = false,
    categories?: Categories,
    page?: number,
    limit: number = 15,
): [Jokes, boolean] {
    const [jokes, isLoading] = useService<Jokes>(
        async function (jokeService) {
            let items = [];
            if (!refetch && allJockes.length) {
                items = allJockes;
            } else {
                const data = await jokeService.getJokes('all');
                items = data.result;
                allJockes.splice(0, items.length, ...items);
                cacheJokes(items);
            }

            const indexedCategories = categories.reduce((acc, category) => {
                acc[category] = true;
                return acc;
            }, {});

            let filteredJokes = [...items];
            if (categories && categories.length) {
                filteredJokes = filteredJokes.filter((joke) => {
                    let isMatch = false;
                    for (let i = 0; i < joke.categories.length; i++) {
                        const currentCategory = joke.categories[i];
                        if (indexedCategories[currentCategory]) {
                            isMatch = true;
                            break;
                        }
                    }
                    return isMatch;
                });
            }

            return filteredJokes;
        },
        [refetch, categories.join(',')],
    );

    return [getPaginatedJokes(jokes, page, limit), isLoading];
}

export function useJokeByID(
    id: string,
    search: string,
): [Joke, boolean, Joke, Joke] {
    const [jokes, isLoading] = useService<Jokes>(
        async function (jokeService) {
            if (cachedAllJockes[id]) {
                return [cachedAllJockes[id]];
            }
            if (!search) {
                return [] as Jokes;
            }
            const data = await jokeService.getJokes(search);
            return data.result;
        },
        [search],
    );
    if (isLoading) {
        return [null, isLoading, null, null];
    }
    if (!isLoading) {
        cacheJokes(jokes);
    }
    const cachedAllJockesList = Object.values(cachedAllJockes);
    const index = cachedAllJockesList.indexOf(cachedAllJockes[id]);
    let nextJoke = null;
    let prevJoke = null;
    if (index >= 0) {
        if (index + 1 < cachedAllJockesList.length) {
            nextJoke = cachedAllJockesList[index + 1];
        }

        if (index - 1 >= 0) {
            prevJoke = cachedAllJockesList[index - 1];
        }
    }
    return [cachedAllJockes[id] || null, isLoading, prevJoke, nextJoke];
}
