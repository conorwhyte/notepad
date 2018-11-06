import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, hashHistory } from 'react-router-dom';

import App from './Pages/App';
import Information from './Pages/Information'; 
import Home from './Pages/Home';

import './index.css';

const appElement = document.getElementById('App');

ReactDOM.render(
  <BrowserRouter history={hashHistory}>
    <div>
      <App />
      <Route exact path="/" component={Home}></Route>
      <Route path="/info/" component={Information}></Route>
    </div>
  </BrowserRouter>, appElement);
