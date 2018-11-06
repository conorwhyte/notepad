import React, { Component } from 'react';
import YAML from 'json-to-pretty-yaml';
import jsonFormatter from 'format-json';
import AceEditor from 'react-ace';
import Nav from './Nav.js';

import 'brace/mode/javascript';
import 'brace/mode/json';
import 'brace/mode/yaml';

import 'brace/theme/textmate';
import 'brace/theme/kuroir';
import 'brace/theme/monokai';
import 'brace/theme/terminal';

import './Home.scss'; 

const COOKIE_VALUE = 'userValue=';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'This is a test', 
      fontSize: 12, 
      tabSize: 2,
      theme: "textmate",
      mode: "javascript",
      showGutter: false,
    };

    this.changeEditorTheme = this.changeEditorTheme.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleChange(newValue) {
    this.setState({
      value: newValue,
    });
  }

  changeEditorTheme(theme) {
    this.setState({
      theme,
    });
  }

  changeTheme() {
    this.setState({
      theme: "kuroir",
      mode: "json",
      showGutter: true,
    });
  }

  jsonToYaml() {
    const { value } = this.state;
    const json = JSON.parse(value);
    const yaml = YAML.stringify(json);

    this.setState({
      value: yaml,
      mode: "yaml",
    });
  }

  format() {
    const { value } = this.state;
    const json = JSON.parse(value);
    const formattedValue = jsonFormatter.plain(json);
    
    this.setState({
      value: formattedValue,
    });
  }

  saveToCookie() {
    const { value } = this.state;
    document.cookie = `${COOKIE_VALUE}${value}`;
  }
  
  getCookie() {
    const { cookie } = document;
    const decodedCookie = decodeURIComponent(cookie);
    const cookieArray = decodedCookie.split(';');

    cookieArray.forEach((value) => {
      while (value.charAt(0) == ' ') {
        value = value.substring(1);
      }

      if (value.indexOf(COOKIE_VALUE) === 0) {
          console.log(value.substring(COOKIE_VALUE.length, value.length));
      }
    });
  }

  optionsBar() {
    return (
      <div className ="optionsBar">
        <button onClick={() => { this.changeTheme(); }}> JSON </button>
        <button onClick={() => { this.jsonToYaml(); }}> YAML </button>
        <button onClick={() => { this.format(); }}> FORMAT </button>
        <button onClick={() => { this.saveToCookie(); }}> SAVE </button>
        <button onClick={() => { this.getCookie(); }}> GET </button>
      </div>
    ); 
  }

  render() {
    const { theme, mode, value, showGutter, fontSize, tabSize } = this.state;
    return (
      <div className="App">
        <Nav changeEditorTheme={this.changeEditorTheme} />
        {/* { this.optionsBar() } */}
        <div className="Editor">  
          <AceEditor
            mode={mode}
            theme={theme}
            value={value}
            width={'100%'}
            height={'100vh'}
            showGutter={showGutter}
            showPrintMargin={false}
            highlightActiveLine={false}
            tabSize={tabSize}
            fontSize={fontSize}
            onChange={this.handleChange}
            name="TextInputEditor" 
          />
        </div>
      </div>
    );
  }
}
export default Home;
