import React, { Component } from "react";
import { Nav, Navbar, NavbarBrand, NavbarToggler, Collapse, NavItem, Jumbotron } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import logo from '../logo.svg';

class Header extends Component {

    constructor(props){
      super(props);
      this.state={
        isNavOpen:false
      };
      this.toggleNav=this.toggleNav.bind(this);
    }
    
    toggleNav(){
      this.setState({
          isNavOpen: !this.state.isNavOpen
    
      });
    }

    render(){
        return(
            <React.Fragment>
            <Navbar dark expand="md">
            <div className="container">
                <NavbarToggler onClick={this.toggleNav} className="m-3," />
                <img src={logo} style={{width:100, marginTop: -7}} />
                <NavbarBrand className="mr-auto" href="/"></NavbarBrand>
                 <Collapse isOpen={this.state.isNavOpen} navbar>
                <Nav className="ml-5" navbar>
                    
                    
                         <span style={{marginRight:25}}>Play</span>
                         <span style={{marginRight:25}}>Games</span>
                         <span style={{marginRight:25}}>Pricing</span>
                         <span style={{marginRight:25}}>FAQ</span>
                         <span style={{marginRight:25}}>Ping Test</span>
                         <span style={{marginRight:25}}>Contact Us</span>
                   
                   </Nav>
                </Collapse>
            </div>
        </Navbar>
        </React.Fragment>
      
        );
}
}
export default Header;