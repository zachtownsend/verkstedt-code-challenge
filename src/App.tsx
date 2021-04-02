import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Starred } from './pages/Starred';
import { TopBar } from './components/TopBar';
import styled from 'styled-components';
import 'semantic-ui-css/semantic.min.css'
import { RepoProvider } from './contexts/RepoContext';

const Main = styled.main`
  padding-top: 84px;
  width: 100%;
  min-height: 100vw;
`;

function App() {
  return (

    <Router>
      <TopBar />
      <Main>
      <RepoProvider>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/starred">
            <Starred />
          </Route>
        </Switch>
      </RepoProvider>
      </Main>
    </Router>
  );
}

export default App;
