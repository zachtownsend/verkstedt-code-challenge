import { render } from '@testing-library/react';
import { repoData } from '../__mocks__/dummy-data';
import RepoGrid from '../components/RepoGrid';

describe('Repo Grid', () => {
    it('Displays message if no repos are found', () => {
        const { queryByText } = render(<RepoGrid repos={[]} />);

        const errorMessage = queryByText('Sorry, no repos here!');

        expect(errorMessage).not.toBeNull();
    });

    it('Displays a custom message when no repos are found', async () => {
        const customMessage = 'This is a custom message';
        const { queryByText } = render(<RepoGrid repos={[]} emptyMessage={customMessage} />);
        const errorMessage = queryByText(customMessage);
        expect(errorMessage).not.toBeNull();
    });

    it('Displays the correct data when provided an object', () => {

        const { queryByTestId, container } = render(<RepoGrid repos={repoData} />);
        const cards = container.querySelectorAll('.ui.card');
        expect(cards.length).toBe(3);

        Array.from(cards).forEach((card, index) => {
            const title = queryByTestId(`title-${repoData[index].id}`);
            const owner = queryByTestId(`owner-${repoData[index].id}`)
            expect(title.textContent).toBe(repoData[index].name);
            expect(owner.textContent).toBe(repoData[index].owner.login);
        });
    });
});