import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import styled from 'styled-components';

interface Props {

}

const brandColor = '#eb5b49';

const Header = styled.header`
    width: 100%;
    height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: ${brandColor};
    color: white;
    z-index: 50;
`;

const NavContainer = styled(Container)`
    height: 100%;
`;

const Nav = styled.nav`
    display: flex;
    height: 100%;
`;

const NavLink = styled(Link)`
    color: white;
    font-size: 18px;
    display: flex;
    align-items: center;
    height: 100%;
    padding: 18px;
    background-color: ${brandColor};

    &:hover {
        color: white;
        background: #ee7060;
    }
`;

export const TopBar = (props: Props) => {
    return (
        <Header>
            <NavContainer>
                <Nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/starred">Starred</NavLink>
                </Nav>
            </NavContainer>
        </Header>
    )
}
