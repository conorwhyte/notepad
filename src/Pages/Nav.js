import React, { Component } from 'react';
import { Navbar, NavbarNav, NavbarBrand, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';

import NotepadImage from '../Assets/notepad.png';
import './Nav.scss'; 

export default class Nav extends Component {
    constructor(props) {
      super(props);

      this.state = {
        collapse: true,
        isWideEnough: false,
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

    previewMarkdown() {
      this.props.previewMarkdown();
    }

    splitMarkdownEditor() {
      this.props.splitMarkdownEditor();
    }

    formatText(value) {
      const { formatJson } = this.props;
      value === 'Json' ? formatJson() : null;
    }

    convertText(value) {
      const { jsonToYaml, yamlToJson } = this.props;
      value === 'Json' ? jsonToYaml() : yamlToJson();
    }

    markdownDropdown() {
      return (
        <NavItem>
          <Dropdown>
            <DropdownToggle nav style={{fontWeight: '500'}}>Markdown</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => this.previewMarkdown()}>Preview</DropdownItem>
              <DropdownItem onClick={() => this.splitMarkdownEditor()}>Double pane</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavItem>
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
          <NavbarBrand href="#" style={{marginLeft: '-7px'}}>
            <img src={NotepadImage} height="30"/>
          </NavbarBrand>
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