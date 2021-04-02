import React, { SyntheticEvent, useContext, useState } from 'react'
import { Container, Dropdown, Loader } from 'semantic-ui-react'
import RepoGrid from '../components/RepoGrid';
import RepoContext from '../contexts/RepoContext';

interface Props {

}

export const Home = (props: Props) => {
    const { repos, loading, languages, filterByLanguage } = useContext(RepoContext);
    const [language, setLanguage] = useState<any>('');
    const handleLanguageFilter = (value: string | number | boolean | (string | number | boolean)[] | undefined) => {
        setLanguage(value);
    };
    return (
        <Container>
            <Container fluid style={{ marginBottom: 24 }}>
                <Dropdown
                    placeholder="Choose language"
                    selection
                    search
                    clearable
                    options={languages.map((language) => ({
                        key: language,
                        text: language,
                        value: language
                    }))}
                    onChange={(e, { value }) => { handleLanguageFilter(value) }}
                />
            </Container>
            <Container fluid>
                {loading ? <Loader inline='centered' active={true} /> : <RepoGrid repos={filterByLanguage(language)} />}
            </Container>
        </Container>
    )
}
