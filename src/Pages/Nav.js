import React, { Component } from 'react';
import { 
  Navbar, 
  NavbarNav, 
  NavItem, 
  Dropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem 
} from 'mdbreact';
import { MARKDOWN_CV, JSON_EXAMPLE } from '../Assets/Constants';

import NotepadImage from '../Assets/notepad.png';
import './Nav.scss'; 

export default class Nav extends Component {
    constructor(props) {
      super(props);

      this.state = {
        styles: [
          'textmate', 
          'kuroir',
          'monokai',
          'terminal',
        ],
        modes: [
          'yaml',
          'json',
          'javascript',
          'markdown',
        ],
      };
    }

    checkboxClick(e) {
      this.props.showGutter(e.target.checked);
    }

    onSearch = (e) => {
      const searchString = e.target.value;
      this.props.searchForString(searchString);
    }

    rightSideNavbar() {
      return (
        <NavbarNav right>
          <NavItem style={{color:'white', paddingRight: '10px'}}>
            Show Gutter
            <input  type="checkbox" 
                    name="gutter" 
                    onChange={this.checkboxClick.bind(this)}
                    style={{marginLeft: '10px', marginRight: '10px'}}/>
          </NavItem>
          <NavItem style={{height: '20px'}}>
            <form className="form-inline md-form mt-0" style={{height: '18px'}}>
              <input  className="form-control mr-sm-2 mb-0 text-white" 
                      type="text" 
                      placeholder="Search"
                      style={{height: '20px', paddingBottom: '0.05rem'}} 
                      aria-label="Search"
                      onChange={this.onSearch} />
            </form>
          </NavItem>
        </NavbarNav>
      );
    }

    yamlJsonDropdown(header) {
      return (
        <NavItem>
          <Dropdown>
            <DropdownToggle nav style={{fontWeight: '500'}}>{header}</DropdownToggle>
            <DropdownMenu>
              { header === 'Json' && <DropdownItem onClick={() => this.formatText(header)}>Format</DropdownItem> }
              <DropdownItem onClick={() => this.convertText(header)}>Convert</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      );
    }

    formatText(value) {
      const { formatJson } = this.props;
      value === 'Json' ? formatJson() : null;
    }

    convertText(value) {
      const { jsonToYaml, yamlToJson } = this.props;
      value === 'Json' ? jsonToYaml() : yamlToJson();
    }

    loadNote() {
      this.props.resetNote();
      this.props.splitMarkdownEditor();
    }

    makeMarkdown() {
      this.props.savePreviousValue();
      this.props.splitMarkdownEditor();
      this.props.handleChange(MARKDOWN_CV);
    }

    loadJsonExample() {
      this.props.savePreviousValue();
      this.props.handleChange(JSON_EXAMPLE);
    }

    markdownDropdown() {
      return (
        <NavItem>
          <Dropdown>
            <DropdownToggle nav style={{fontWeight: '500'}}>Markdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.props.previewMarkdown()}>Preview</DropdownItem>
              <DropdownItem onClick={() => this.props.splitMarkdownEditor()}>Double pane</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      );
    }

    notepadIcon() {
      return (
        <Dropdown>
          <DropdownToggle nav style={{fontWeight: '500', marginLeft: '-12px', padding: '.5rem .3rem'}}>
            <img src={NotepadImage} height="30"/>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => this.loadNote()}>Your note</DropdownItem>
            <DropdownItem onClick={() => this.makeMarkdown()}>Sample MD</DropdownItem>
            <DropdownItem onClick={() => this.loadJsonExample()}>Sample Json</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      );
    }

    mapDropdown(items, header, onClickFunc) {
      return (
        <NavItem>
          <Dropdown>
            <DropdownToggle nav style={{fontWeight: '500'}}>{header}</DropdownToggle>
            <DropdownMenu>
            { items.map((value) => 
                <DropdownItem onClick={() => onClickFunc(value)} key={value}>
                  {value}
                </DropdownItem> 
              )}
            </DropdownMenu>
          </Dropdown>
        </NavItem>
      );
    }

    render() {
      const { styles, modes } = this.state;
      const { changeEditorTheme, changeEditorMode } = this.props;
      
      return (
        <Navbar color="elegant-color" dark expand="md" scrolling>
          { this.notepadIcon() }
          <NavbarNav left>
            { this.yamlJsonDropdown('Json') }
            
            { this.yamlJsonDropdown('Yaml') }
            
            { this.markdownDropdown() }

            { this.mapDropdown(styles, 'Style', changeEditorTheme) }

            { this.mapDropdown(modes, 'Mode', changeEditorMode) }
          </NavbarNav>

          { this.rightSideNavbar() }

        </Navbar>
      );
    }
}