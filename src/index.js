import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { AUTH_USER } from './actions/types'

import routes from './routes'
import reducers from './reducers'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(reducers)

const auth_token = localStorage.getItem('auth_token')
const user = localStorage.getItem('user')
if (auth_token) {
	store.dispatch({
		type: AUTH_USER,
		payload: JSON.parse(user)
	})
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.app'));
