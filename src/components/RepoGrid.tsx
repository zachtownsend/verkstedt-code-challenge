import React, { useContext } from 'react'
import { Card, Divider, Button, Label, Icon } from 'semantic-ui-react';
import TextTruncate from 'react-text-truncate';
import { IRepo } from '../types';
import RepoContext from '../contexts/RepoContext';

interface Props {
    repos: Array<IRepo>;
}

const RepoGrid = ({ repos }: Props) => {
    const { addStar, removeStar, isStarred, starred } = useContext(RepoContext);

    return (
        <Card.Group>
            {repos.map((repo) => {
                const activeStar = starred[repo.id] !== undefined;

                return (
                    <Card key={repo.id}>
                        <Card.Content>
                            <Card.Header as="h3">
                                <TextTruncate line={2} text={repo.name} />
                            </Card.Header>
                            <Card.Meta>{repo.owner.login}</Card.Meta>
                            <Divider />
                            <Card.Description>
                                <p><TextTruncate line={4} text={repo.description} element="div" /></p>
                            </Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <Button as='div' labelPosition='right'>
                                <Label>
                                    {repo.stargazers_count}
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

export default RepoGrid;