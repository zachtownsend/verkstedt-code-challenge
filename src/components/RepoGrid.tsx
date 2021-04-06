import React, { useContext } from 'react'
import { Card, Divider, Button, Label, Icon, Segment, Header } from 'semantic-ui-react';
import TextTruncate from 'react-text-truncate';
import { IRepo } from '../types';
import RepoContext from '../contexts/RepoContext';

interface Props {
    repos: Array<IRepo>;
    emptyMessage: string;
}

const DefaultProps: Props = {
    repos: [],
    emptyMessage: 'Sorry, no repos here!'
};

const EmptyMessage = ({ message }:  { message: string }) => {
    return (
        <Segment placeholder>
            <Header icon>
            <Icon name='star' />
            {message}
            </Header>
        </Segment>
    );
};

const RepoGrid = ({ repos, emptyMessage }: Props) => {
    const { addStar, removeStar, starred } = useContext(RepoContext);

    if (repos.length === 0) {
        return <EmptyMessage message={emptyMessage} />;
    }

    return (
        <Card.Group data-testid="repo-cards">
            {repos.map((repo) => {
                const activeStar = starred[repo.id] !== undefined;
                const totalStars = activeStar ? repo.stargazers_count + 1 : repo.stargazers_count;

                return (
                    <Card key={repo.id}>
                        <Card.Content>
                            <Card.Header as="h3">
                                <a href={repo.html_url} target="_blank" rel="noreferrer" data-testid={`title-${repo.id}`}>
                                    {repo.name}
                                </a>
                            </Card.Header>
                            <Card.Meta data-testid={`owner-${repo.id}`}>{repo.owner.login}</Card.Meta>
                            <Divider />
                            <Card.Description>
                                <TextTruncate line={4} text={repo.description} element="div" truncateText="…" />
                            </Card.Description>
                            {repo.language && <p>{repo.language}</p>}
                        </Card.Content>
                        <Card.Content extra>
                            <Button as='div' labelPosition='left'>
                                <Label>
                                    {totalStars}
                                </Label>
                                <Button icon onClick={() => activeStar ? removeStar(repo.id) : addStar(repo)}>
                                    <Icon name={activeStar ? 'star' : 'star outline' } />
                                </Button>
                            </Button>
                        </Card.Content>
                    </Card>
                );
            })}
        </Card.Group>
    )
}

RepoGrid.defaultProps = DefaultProps;

export default RepoGrid;