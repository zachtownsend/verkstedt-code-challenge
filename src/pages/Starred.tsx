import React, { useContext } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import RepoGrid from '../components/RepoGrid';
import RepoContext from '../contexts/RepoContext';

interface Props {

}

export const Starred = (props: Props) => {
    const { starred } = useContext(RepoContext);

    const repos = Object.values(starred);

    return (
        <Container>
            <h1>Starred</h1>
            <Segment size="massive" content={<RepoGrid repos={repos} />} />
        </Container>
    )
}
