import React from 'react';
import queryString from 'query-string';

export interface JokeServiceInterface {
    getCategories(): Promise<Categories>;
    getJokes(search?: string): Promise<JokesResponse>;
    getJokesByCategories(categories: Categories): Promise<JokesResponse>;
}

export type Category = string;
export type Categories = Category[];

export type Joke = {
    id: string;
    categories: Category[];
    value: string;
    icon_url: string;
    url: string;
    updated_at: string;
    created_at: string;
};

export type Jokes = Joke[];

export type JokesResponse = {
    total: number;
    result: Jokes;
};

class JokeService implements JokeServiceInterface {
    private readonly baseUrl = 'https://api.chucknorris.io/jokes';

    private async callApi<T>(
        route: string,
        params: { [key: string]: string | number | boolean } = {},
    ): Promise<T> {
        let url = `${this.baseUrl}/${route.replace(/^\//, '')}`;
        if (Object.keys(params).length > 0) {
            url += `?${queryString.stringify(params)}`;
        }
        const response = await fetch(url);
        const res: T = await response.json();
        return res;
    }

    public async getJokesByCategories(
        categories: Categories,
    ): Promise<JokesResponse> {
        return this.callApi<JokesResponse>('random', {
            category: categories.join(','),
        });
    }

    public async getCategories(): Promise<Categories> {
        return this.callApi<Categories>('categories');
    }

    public async getJokes(search: string = ''): Promise<JokesResponse> {
        let query = 'all';
        if (search.length < 3 && search.length > 0) {
            throw new Error('Search term must be at least 3 characters long');
        }
        if (search.length > 0) {
            query = search;
        }

        return this.callApi<JokesResponse>('search', { query });
    }
}

export const JokeServiceContext = React.createContext<JokeServiceInterface>(
    new JokeService(),
);

export const JokeServiceProvider: React.FC = ({ children }) => (
    <JokeServiceContext.Provider value={new JokeService()}>
        {children}
    </JokeServiceContext.Provider>
);
