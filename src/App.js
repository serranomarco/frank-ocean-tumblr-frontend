import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { EndlessContext } from './EndlessContext';
import Login from './Login';
import Register from './Register'
import Feed from './Feed'
import { PrivateRoute } from './routesUtil';

function App() {
  const { needLogin, username } = useContext(EndlessContext);
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/register' component={Register} />
        <PrivateRoute path={`/${username}/blog`} component={Feed} needLogin={needLogin} />
        <PrivateRoute path={`/`} component={Feed} needLogin={needLogin} />
      </Switch>
    </BrowserRouter>
  )
}

export default App;
