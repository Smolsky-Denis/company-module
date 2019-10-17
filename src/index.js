import React from 'react';
import ReactDOM from 'react-dom';
// import store from "./redux/state";
import App from './app/App.js';
import {BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import store from './store'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';


let rerender = (state) => {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter basename='/company'>
        <App state={state} dispatch={store.dispatch.bind(store)}/>
      </BrowserRouter>
    </Provider>, document.getElementById('root')
  )
};

rerender(store.getState());

store.subscribe(rerender);
