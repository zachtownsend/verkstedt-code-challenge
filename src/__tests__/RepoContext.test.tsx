import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Starred } from '../pages/Starred';
import RepoContext, { RepoProvider } from '../contexts/RepoContext';
import { repoData, starredData } from '../__mocks__/dummy-data';
import { unmountComponentAtNode } from 'react-dom';
import RepoGrid from '../components/RepoGrid';

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    localStorage.clear();
    return cleanup();
});

describe('Repo Context', () => {
    it('Bootstraps stored stars on load', async () => {
        localStorage.setItem('starred', JSON.stringify(repoData));
        render(
            <RepoProvider>
                <Starred />
            </RepoProvider>
        );

        const cardContainer = screen.queryByTestId('repo-cards');
        const cards = cardContainer?.querySelectorAll('.card');

        expect(cards.length).toBe(3);

        Array.from(cards).forEach((card, index) => {
            const title = screen.queryByTestId(`title-${repoData[index].id}`);
            const owner = screen.queryByTestId(`owner-${repoData[index].id}`)
            expect(title.textContent).toBe(repoData[index].name);
            expect(owner.textContent).toBe(repoData[index].owner.login);
        });
    });

    it('shows appropriate message if no items starred', () => {
        render(
            <RepoProvider>
                <Starred />
            </RepoProvider>
        );

        expect(screen.queryByText('Sorry, no repos here!')).not.toBe(null);
    });

    it('Adds starred repo to localstorage', () => {
        localStorage.setItem('starred', JSON.stringify({ [repoData[0].id]: starredData[repoData[0].id] }));

        render(
            <RepoProvider>
                <RepoGrid repos={repoData} />
            </RepoProvider>
        );

        const initiallyStarredCard = screen.getByText(repoData[0].name).closest('.ui.card');
        const cardToStar = screen.getByText(repoData[1].name).closest('.ui.card');

        expect(initiallyStarredCard.querySelector('i.star.icon')).not.toHaveClass('outline');
        expect(cardToStar.querySelector('i.star.icon')).toHaveClass('outline');

        fireEvent(
            cardToStar.querySelector('.ui.icon.button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(cardToStar.querySelector('i.star.icon')).not.toHaveClass('outline');
        expect(JSON.parse(localStorage.getItem('starred'))).toEqual({
            [repoData[0].id]: repoData[0],
            [repoData[1].id]: repoData[1],
        });
    });

    it('Removes stored repo data from localstorage', () => {
        localStorage.setItem('starred', JSON.stringify(starredData));

        render(
            <RepoProvider>
                <RepoGrid repos={repoData} />
            </RepoProvider>
        );

        const cardToRemoveStar = screen.getByText(repoData[0].name).closest('.ui.card');

        expect(cardToRemoveStar.querySelector('i.star.icon')).not.toHaveClass('outline');

        fireEvent(
            cardToRemoveStar.querySelector('.ui.icon.button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(cardToRemoveStar.querySelector('i.star.icon')).toHaveClass('outline');

        expect(JSON.parse(localStorage.getItem('starred'))).toEqual({
            [repoData[1].id]: repoData[1],
            [repoData[2].id]: repoData[2],
        });
    });
});