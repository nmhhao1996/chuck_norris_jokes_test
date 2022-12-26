import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { Joke } from 'services/JokeService';

export function useQuery() {
    const location = useLocation();
    return queryString.parse(location.search);
}

export function useJokeDetailRoute(joke: Joke): string {
    const { search } = useQuery();
    const leadChars = joke.value.substring(0, 5);
    const jokeId = joke.id;
    let searchQuery = '';
    if (search) {
        searchQuery = '?' + queryString.stringify({ search });
    }
    return `/detail/${leadChars}/${jokeId}${searchQuery}`;
}
