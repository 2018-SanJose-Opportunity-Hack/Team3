import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './store/reducers/index';

import jwt_decode from 'jwt-decode';
import setAuthToken from './util/setAuthToken';
import actionTypes from './store/actions/types/index';

import {BrowserRouter} from 'react-router-dom';
import isEmpty from './util/is-empty';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

//check expire token make a dummy request

//check if user is authenticated on load
if (!isEmpty(localStorage.getItem('parkUserCurrent'))) {
  let token = localStorage.getItem('parkUserCurrent');
  console.log(token);
  let tokenDecode = null;
  try{
    tokenDecode = jwt_decode(localStorage.getItem('parkUserCurrent'))
  }catch(error){
    tokenDecode = null;
  }
  if(tokenDecode){
    setAuthToken(token);
    
    store.dispatch({
      type: actionTypes.auth.SET_USER,
      payload: tokenDecode
    });
  }else{
    localStorage.removeItem('parkUserCurrent');
    store.dispatch({
      type: actionTypes.auth.REMOVE_USER
    });
  }
}else{
  store.dispatch({
    type: actionTypes.auth.REMOVE_USER
  });
}
ReactDOM.render(<Provider store = {store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
