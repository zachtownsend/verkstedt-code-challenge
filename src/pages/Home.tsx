import React, { useContext } from 'react'
import { Container, Dimmer, Loader } from 'semantic-ui-react'
import RepoGrid from '../components/RepoGrid';
import RepoContext from '../contexts/RepoContext';

interface Props {

}

export const Home = (props: Props) => {
    const { repos, loading } = useContext(RepoContext);

    return (
        <Container>
            <Container fluid>
                {loading ? <Loader inline='centered' active={true} /> : <RepoGrid repos={repos} />}
            </Container>
        </Container>
    )
}
