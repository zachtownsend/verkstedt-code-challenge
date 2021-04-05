import React, { createContext, useState, useEffect, useMemo, ReactNode } from 'react';
import dayjs from 'dayjs';
import axios, { AxiosRequestConfig } from 'axios';
import { IRepo, IGithubResponse, IStarred } from '../types';

interface ContextProps {
    repos: IRepo[];
    languages: Array<string>;
    loading: boolean;
    weekStart: any;
    starred: IStarred;
    fetchRepos(): void;
    filterByLanguage(language: string): IRepo[];
    addStar(repo: IRepo): void;
    removeStar(id: number): void;
    isStarred(id: number): boolean;
}

const RepoContext = createContext<ContextProps>({
    repos: [],
    languages: [],
    loading: true,
    weekStart: dayjs().subtract(7, 'day'),
    starred: {},
    fetchRepos: () => {},
    filterByLanguage: () => [],
    addStar: () => {},
    removeStar: () => {},
    isStarred: () => false
});

interface Props {
    children: ReactNode;
}

export const bootstrapStars = (): IStarred => {
    const storedStars = localStorage.getItem('starred');

    if (storedStars !== null ) {
        const restoredStars = JSON.parse(storedStars);

        if (Array.isArray(restoredStars) && restoredStars.length === 0) {
            return {};
        } else {
            return restoredStars;
        }
    }

    return {};
}

export const RepoProvider = ({ children }: Props) => {
    const [repos, setRepos] = useState<Array<IRepo> | []>([]);
    const [starred, setStarred] = useState<IStarred>(bootstrapStars());
    const [loading, setLoading] = useState<boolean>(true);
    const [languages, setLanguages] = useState<Array<string>>([]);
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

    const fetchRepos = async () => {
        try {
            const result = await axios(requestOptions);
            const items: IRepo[] = result.data.items.map((
                {
                    id,
                    name,
                    owner,
                    html_url,
                    stargazers_count,
                    description,
                    created_at,
                    updated_at,
                    language
                }: IGithubResponse
            ) => {
                if (typeof language === 'string' && !languages.includes(language)) {
                    languages.push(language)
                    setLanguages(languages);
                }

                return {
                    id,
                    name,
                    owner,
                    html_url,
                    stargazers_count,
                    description,
                    created_at,
                    updated_at,
                    language
                };
            });

            setRepos(items);
        } catch (error) {
            // console.error({ error });
        }

        setLoading(false);
    };

    const filterByLanguage = (language: string | number | boolean | (string | number | boolean)[] | undefined) => {
        if (language === '') {
            return repos;
        }

        return repos.filter(repo => repo.language === language);
    };

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
                languages,
                loading,
                weekStart,
                starred,
                fetchRepos,
                filterByLanguage,
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