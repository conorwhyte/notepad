import React, { Component } from 'react'; 
import AppStore from '../Store/AppStore'; 

import './App.scss'; 

class App extends Component {
  constructor() {
    super();

    this.state = {
      isMobile: AppStore.getMobile()
    };
  }

  render() {
    return ( 
      <div className="App">

      </div> 
    ); 
  }
}
export default App;
