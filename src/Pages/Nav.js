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
        ],
        modes: [
          'yaml',
          'json',
          'javascript',
        ],
      };
    }

    render() {
      const { styles, modes } = this.state;
      return (
        <Navbar color="elegant-color" dark expand="md" scrolling>
          <NavbarBrand href="#" style={{marginLeft: '-7px'}}>
            <img src={NotepadImage} height="30"/>
          </NavbarBrand>
          <NavbarNav left>
            <NavItem>
            <Dropdown>
              <DropdownToggle nav style={{fontWeight: '500'}}>Json</DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Format</DropdownItem>
                <DropdownItem href="#">Validate</DropdownItem>
                <DropdownItem href="#">Convert to Yaml</DropdownItem>
              </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
            <Dropdown>
              <DropdownToggle nav style={{fontWeight: '500'}}>Yaml</DropdownToggle>
              <DropdownMenu>
                <DropdownItem href="#">Format</DropdownItem>
                <DropdownItem href="#">Validate</DropdownItem>
                <DropdownItem href="#">Convert to Json</DropdownItem>
              </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav style={{fontWeight: '500'}}>Markdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Preview</DropdownItem>
                  <DropdownItem href="#">Double pane</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav style={{fontWeight: '500'}}>Style</DropdownToggle>
                <DropdownMenu>
                  { styles.map((value) => 
                    <DropdownItem href="#" onClick={() => this.props.changeEditorTheme(value)} key={value}>
                      {value}
                    </DropdownItem> 
                  )}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav style={{fontWeight: '500'}}>Mode</DropdownToggle>
                <DropdownMenu>
                { modes.map((value) => 
                    <DropdownItem href="#" onClick={() => this.props.changeEditorTheme(value)} key={value}>
                      {value}
                    </DropdownItem> 
                  )}
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem style={{color:'white', paddingRight: '10px'}}>
              Show Gutter
              <input  type="checkbox" 
                      name="gutter" 
                      style={{marginLeft: '10px', marginRight: '10px'}}/>
            </NavItem>
            <NavItem style={{height: '20px'}}>
              <form className="form-inline md-form mt-0" style={{height: '18px'}}>
                <input  className="form-control mr-sm-2 mb-0 text-white" 
                        type="text" 
                        placeholder="Search"
                        style={{height: '20px', paddingBottom: '0.05rem'}} 
                        aria-label="Search" />
              </form>
            </NavItem>
          </NavbarNav>
        </Navbar>
      );
    }
}