import React from 'react'
import { Card, Divider, Button, Label, Icon } from 'semantic-ui-react';
import TextTruncate from 'react-text-truncate';
import { Repo } from '../types';

interface Props {
    repos: Array<Repo>;
}

const RepoGrid = ({ repos }: Props) => {
    return (
        <Card.Group>
            {repos.map((repo) => (
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
                            <Button icon>
                                <Icon name="star outline" />
                            </Button>
                        </Button>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    )
}

export default RepoGrid;