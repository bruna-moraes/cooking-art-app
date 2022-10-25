import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Provider from './context/Provider';
import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
      <Provider>
        <Switch>
          <Route exact path="/" component={ Login } />
        </Switch>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
