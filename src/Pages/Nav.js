import React, { Component } from 'react';
import { Navbar, NavbarNav, NavbarBrand, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'mdbreact';
import './Nav.scss'; 

import NotepadImage from '../Assets/notepad.png';

export default class Nav extends Component {
    constructor(props) {
      super(props);

      this.state = {
        collapse: true,
        isWideEnough: false,
      };
    }

    render() {
      // caret
      return (
        <Navbar color="elegant-color" dark expand="md" scrolling>
          <NavbarBrand href="#" style={{marginLeft: '-10px'}}>
            <img src={NotepadImage} height="30"/>
          </NavbarBrand>
          <NavbarNav left>
            <NavItem>
              <NavLink to="#"> JSON </NavLink>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav >Markdown</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav >Style</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
            <NavItem>
              <Dropdown>
                <DropdownToggle nav >Mode</DropdownToggle>
                <DropdownMenu>
                  <DropdownItem href="#">Action</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavItem>
          </NavbarNav>
          <NavbarNav right>
            <NavItem style={{height: '20px'}}>
              <form className="form-inline md-form mt-0" style={{height: '18px'}}>
                <input  className="form-control mr-sm-2 mb-0 text-white" 
                        type="text" 
                        placeholder="Search"
                        style={{height: '20px'}} 
                        aria-label="Search" />
              </form>
            </NavItem>
          </NavbarNav>
        </Navbar>
      );
    }
}