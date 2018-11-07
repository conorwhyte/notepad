import React, { Component } from 'react';
import YAML from 'json-to-pretty-yaml';
import yaml from 'yaml';
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
      value: 'Put your text in here.', 
      fontSize: 12, 
      tabSize: 2,
      theme: "textmate",
      mode: "javascript",
      showGutter: false,
      paddingLeft: null,
      showOnlyMarkdown: false,
      showSplitPanel: false,
    };

    this.handleChange = this.handleChange.bind(this);
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
      case 'terminal': 
        document.body.style = 'background: black;';
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
      showSplitPanel: !prevState.showSplitPanel,
      showOnlyMarkdown: false,
    })); 
  }

  previewMarkdown() {
    this.setState(prevState => ({
      showOnlyMarkdown: !prevState.showOnlyMarkdown,
      showSplitPanel: false,
    })); 
  }

  jsonToYaml() {
    let { value } = this.state;
    const json = JSON.parse(value);
    value = YAML.stringify(json);

    this.setState({ value });
  }

  yamlToJson() {
    const { value } = this.state;
    const yamlObj = yaml.parse(value);
    const formattedValue = jsonFormatter.plain(yamlObj);

    this.setState({
      value: formattedValue,
    });
  }

  formatJson() {
    const { value } = this.state;
    const json = JSON.parse(value);
    const formattedValue = jsonFormatter.plain(json);
    
    this.setState({
      value: formattedValue,
    });
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

  textEditor() {
    const { mode, theme, value, showGutter, tabSize, fontSize } = this.state;
    return (
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
        setOptions={{
          highlightSelectedWord: true
        }}
        editorProps={{
          $blockScrolling: Infinity
        }}
        name="aceEditor" 
        ref="reactAceComponent" />
    );
  }

  render() {
    const { value, paddingLeft, showOnlyMarkdown, showSplitPanel } = this.state;
    const editorWidth = showSplitPanel ? '50%' : '100%';
    const markdownWidth = showOnlyMarkdown ? '100%' : '45%';
    const markdownPadding = showOnlyMarkdown ? '10px' : null;

    return (
      <div className="App">
        <Nav  
          changeEditorTheme={this.changeEditorTheme.bind(this)} 
          searchForString={this.searchForString.bind(this)}
          changeEditorMode={this.changeEditorMode.bind(this)}
          showGutter={this.showGutter.bind(this)}
          previewMarkdown={this.previewMarkdown.bind(this)}
          splitMarkdownEditor={this.splitMarkdownEditor.bind(this)}
          formatJson={this.formatJson.bind(this)}
          jsonToYaml={this.jsonToYaml.bind(this)}
          yamlToJson={this.yamlToJson.bind(this)} />

        <div className="Editor" style={{paddingLeft, width: editorWidth}}>  
          { !showOnlyMarkdown && this.textEditor() }
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
