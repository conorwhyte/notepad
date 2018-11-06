import React, { Component } from 'react'; 
import { Link } from 'react-router-dom'; 

import AppStore from '../Store/AppStore'; 
import './App.scss'; 

class App extends Component {
  constructor() {
    super();

    this.state = {
      isMobile: AppStore.getMobile()
    };
  }

  componentDidMount() {
    AppStore.on('changeUser', () => {
      this.setState({
        user: AppStore.getUser(), 
      });
    });
  }

  render() {
    const browser = window.chrome ? 'Chrome' : 'Other';
    const userName = AppStore.getUser();
    const pageState = {
      fromHome: true, 
      browser,
      ...this.state,
    }; 

    return ( 
      <div className="App">
        <div className='App-navbar'> 
          <ul> 
            <Link id='homePage' to="/">Home</Link>
            <Link
              to={{
                pathname: '/info',
                search: `?name=${userName}`,
                state: { ...pageState },
              }}> Info</Link>
          </ul>
        </div> 
      </div> 
    ); 
  }
}
export default App;
