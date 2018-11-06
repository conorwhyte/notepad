import React, { Component } from 'react';
import YAML from 'json-to-pretty-yaml';
import jsonFormatter from 'format-json';
import AceEditor from 'react-ace';
import ReactMarkdown from 'react-markdown';
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
      paddingLeft: null,
      showOnlyMarkdown: false,
      showSplitPanel: false,
    };

    this.showGutter = this.showGutter.bind(this);
    this.searchForString = this.searchForString.bind(this);
    this.changeEditorTheme = this.changeEditorTheme.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeEditorMode = this.changeEditorMode.bind(this);
    this.previewMarkdown = this.previewMarkdown.bind(this);
    this.splitMarkdownEditor = this.splitMarkdownEditor.bind(this);
  }
  
  handleChange(newValue) {
    this.setState({
      value: newValue,
    });
  }

  changeEditorTheme(theme) {
    this.setState({ theme });
    this.changeBackgroundColour(theme);
  }

  changeBackgroundColour(theme) {
    switch (theme) {
      case 'textmate': 
        document.body.style = 'background: white;';
        break;
      case 'kuroir': 
        document.body.style = 'background: #E8E9E8;';
        break;
      case 'monokai': 
        document.body.style = 'background: #272722;';
        break;
    }
  }

  showGutter(showGutter) {
    this.setState({ 
      showGutter,
      paddingLeft: showGutter ? '0px' : null, 
    });
  }

  changeEditorMode(mode) {
    this.setState({ mode });
  }

  splitMarkdownEditor() {
    this.setState(prevState => ({
      showSplitPanel: !prevState.showSplitPanel
    })); 
  }

  previewMarkdown() {
    this.setState(prevState => ({
      showOnlyMarkdown: !prevState.showOnlyMarkdown
    })); 
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

  searchForString(searchString) {
    const reactAceComponent = this.refs.reactAceComponent;
    const editor = reactAceComponent.editor;
    editor.findAll(searchString, {
      backwards: false,
      wrap: true,
      caseSensitive: false,
      wholeWord: false,
      regExp: true,
    });
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
        {/* <button onClick={() => { this.changeTheme(); }}> JSON </button>
        <button onClick={() => { this.jsonToYaml(); }}> YAML </button>
        <button onClick={() => { this.format(); }}> FORMAT </button> */}
        <button onClick={() => { this.saveToCookie(); }}> SAVE </button>
        {/* <button onClick={() => { this.getCookie(); }}> GET </button> */}
      </div>
    ); 
  }

  render() {
    const { 
      theme, 
      mode, 
      value, 
      showGutter, 
      fontSize, 
      tabSize, 
      paddingLeft, 
      showOnlyMarkdown, 
      showSplitPanel 
    } = this.state;
    const editorWidth = showSplitPanel ? '50%' : '100%';
    const markdownWidth = showOnlyMarkdown ? '100%' : '45%';
    const markdownPadding = showOnlyMarkdown ? '10px' : null;

    return (
      <div className="App">
        <Nav  
          changeEditorTheme={this.changeEditorTheme} 
          searchForString={this.searchForString}
          changeEditorMode={this.changeEditorMode}
          showGutter={this.showGutter}
          previewMarkdown={this.previewMarkdown}
          splitMarkdownEditor={this.splitMarkdownEditor} />
        <div className="Editor" style={{paddingLeft, width: editorWidth}}>  
          { !showOnlyMarkdown && <AceEditor
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
            setOptions={{
              highlightSelectedWord: true
            }}
            name="aceEditor" 
          ref="reactAceComponent" /> }
        </div>
        { ( showOnlyMarkdown || showSplitPanel ) && (
          <div style={{width: markdownWidth, float: 'right', paddingLeft: markdownPadding}}>
            <ReactMarkdown source={value}/>
          </div>
        )}
      </div>
    );
  }
}
export default Home;
