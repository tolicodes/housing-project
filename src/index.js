import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import App from './App';

import reducer from './reducer';
import saga from './saga';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// eslint-disable-next-line
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// mount it on the Store
const store = createStore(
  reducer,
  {},
  composeEnhancers(
    applyMiddleware(
      sagaMiddleware,
    ),
  ),
);

// then run the saga
sagaMiddleware.run(saga);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
