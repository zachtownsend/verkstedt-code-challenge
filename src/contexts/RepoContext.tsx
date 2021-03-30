import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import dayjs from 'dayjs';
import axios, { AxiosRequestConfig } from 'axios';
import { Repo, GithubResponse } from '../types';

interface ContextProps {
    repos: Array<Repo>;
    loading: boolean;
    weekStart: any;
}

const RepoContext = createContext<ContextProps>({
    repos: [],
    loading: true,
    weekStart: dayjs().subtract(7, 'day')
});

interface Props {
    children: ReactNode;
}

export const RepoProvider = ({ children }: Props) => {
    const [repos, setRepos] = useState<Array<Repo> | []>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const weekStart = dayjs().subtract(7, 'day');

    const requestOptions: AxiosRequestConfig = useMemo(() => ({
        method: 'GET',
        url: 'https://api.github.com/search/repositories',
        params: {
            q: `created:>${weekStart.format('YYYY-MM-DD')}`,
            sort: 'stars',
            order: 'desc'
        }
    }), [weekStart]);

    useEffect(() => {
        const fetchRepos = async () => {
            try {
                const result = await axios(requestOptions);
                const items: Repo[] = result.data.items.map(({
                    id,
                    name,
                    owner,
                    html_url,
                    stargazers_count,
                    description,
                    created_at,
                    updated_at,
                }: GithubResponse) => ({
                    id,
                    name,
                    owner,
                    html_url,
                    stargazers_count,
                    description,
                    created_at,
                    updated_at,
                }));

                setRepos(items);
            } catch (error) {
                console.error({ error });
            }

            setLoading(false);
        };

        fetchRepos();
    }, []);


    return (
        <RepoContext.Provider
            value={{
                repos,
                loading,
                weekStart
            }}
        >
            {children}
        </RepoContext.Provider>
    )
};

export default RepoContext;