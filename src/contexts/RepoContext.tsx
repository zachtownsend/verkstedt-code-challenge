import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import dayjs from 'dayjs';
import axios, { AxiosRequestConfig } from 'axios';
import { IRepo, IGithubResponse, IStarred } from '../types';

interface ContextProps {
    repos: Array<IRepo>;
    loading: boolean;
    weekStart: any;
    starred: IStarred;
    addStar(repo: IRepo): void;
    removeStar(id: number): void;
    isStarred(id: number): boolean;
}

const RepoContext = createContext<ContextProps>({
    repos: [],
    loading: true,
    weekStart: dayjs().subtract(7, 'day'),
    starred: {},
    addStar: () => {},
    removeStar: () => {},
    isStarred: () => false
});

interface Props {
    children: ReactNode;
}

export const RepoProvider = ({ children }: Props) => {
    const [repos, setRepos] = useState<Array<IRepo> | []>([]);
    const [starred, setStarred] = useState<IStarred>({});
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
        // Fetch repos
        const fetchRepos = async () => {
            try {
                const result = await axios(requestOptions);
                const items: IRepo[] = result.data.items.map(({
                    id,
                    name,
                    owner,
                    html_url,
                    stargazers_count,
                    description,
                    created_at,
                    updated_at,
                }: IGithubResponse) => ({
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

    useEffect(() => {
        // Bootstrap starred
        const storedStars = localStorage.getItem('starred');

        if (storedStars !== null ) {
            const restoredStars = JSON.parse(storedStars);

            if (Array.isArray(restoredStars) && restoredStars.length === 0) {
                setStarred({});
            } else {
                setStarred(restoredStars);
            }
        }

        return () => {
            localStorage.setItem('starred', JSON.stringify(starred));
        };
    }, []);

    const addStar = (repo: IRepo) => {
        starred[repo.id] = repo;
        setStarred({...starred});
        localStorage.setItem('starred', JSON.stringify(starred));
    };

    const removeStar = (id: number) => {
        delete starred[id];
        setStarred({...starred});
        localStorage.setItem('starred', JSON.stringify(starred));
    };

    const isStarred = (id: number) => {
        return starred[id] !== undefined;
    }

    return (
        <RepoContext.Provider
            value={{
                repos,
                loading,
                weekStart,
                starred,
                addStar,
                removeStar,
                isStarred
            }}
        >
            {children}
        </RepoContext.Provider>
    )
};

export default RepoContext;