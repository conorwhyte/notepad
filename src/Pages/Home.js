import React, { Component } from 'react';
import * as AppActions from '../Actions/AppActions'; 

import ReactLogo from '../Assets/logo.svg';
import './Home.scss'; 

class Home extends Component {
  
  handleChange(e) {
    const user = e.target.value;
    AppActions.changeUser(user);
  }

  render() {
    return ( 
      <div className='Home-body'>
        <img src={ReactLogo} className="Home-body-logo" alt="logo" />
        <h1> React and Parcel barebones app </h1>
        <p> This input is added into the URL as the username </p>
        <input onChange={this.handleChange} />
      </div> 
    ); 
  }
}
export default Home;
