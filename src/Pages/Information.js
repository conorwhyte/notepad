import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { parse } from 'query-string';

import './Information.scss'; 

class Information extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...props.location.state
    };
  }

  render() {
    const { search } = this.props.location;
    const { browser } = this.state;
    const parsed = parse(search);

    return ( 
      <div className='Information-body'> 
        <h1> Browser and user information </h1>
        <p>{`Information Container, with variables from the state and URL, such as ${parsed.name} and the browser used: ${browser}`}</p>
      </div>
    ); 
  }
}
export default Information;

Information.propTypes = {
  location: PropTypes.object,
};