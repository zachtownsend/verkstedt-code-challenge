import React, { useContext } from 'react'
import { Container, Segment } from 'semantic-ui-react'
import RepoGrid from '../components/RepoGrid';
import RepoContext from '../contexts/RepoContext';

interface Props {

}

export const Home = (props: Props) => {
    const { repos, loading } = useContext(RepoContext);

    return (
        <Container>
            <h1>Home</h1>
            <Segment size="massive" loading={loading} content={<RepoGrid repos={repos} />} />
        </Container>
    )
}
