import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

interface Props {

}

const Header = styled.header`
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
`;

export const TopBar = (props: Props) => {
    return (
        <Header>
            <Container>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/starred">Starred</Link>
                </nav>
            </Container>
        </Header>
    )
}
