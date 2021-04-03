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
    display: flex;
`;

const NavWrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
`;

const PageTitle = styled.h1`
    height: 100%;
    margin: 0 12px 0 0;
    font-size: 14px;
    display: flex;
    align-items: center;

    @media screen and (min-width: 590px) {
        font-size: 24px;
    }
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
                <NavWrapper>
                    <PageTitle>Verkstedt Code Challenge</PageTitle>
                    <Nav>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/starred">Starred</NavLink>
                    </Nav>
                </NavWrapper>
            </NavContainer>
        </Header>
    )
}
