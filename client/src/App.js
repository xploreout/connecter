import React, { Fragment } from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//redux
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={ Landing }/>
          <section className="container">
          <Switch>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={ Register }/>
          </Switch>
          </section>
        </Fragment>
    </Router>
   </Provider>
    
  );
};

export default App;
