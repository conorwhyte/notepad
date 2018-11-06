import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './Pages/Home';

import './index.css';

const appElement = document.getElementById('App');

ReactDOM.render(
  <BrowserRouter>
    <div>
      <Route exact path="/" component={Home}></Route>
    </div>
  </BrowserRouter>, appElement);
