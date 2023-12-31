import React, { Component } from 'react';
import './NavMenu.css';
import DrawerBox from "./Layout/DrawerBox";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  
  render() {
    return (
      // <aside>
      //   <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
      //     <NavbarBrand tag={Link} to="/">ASPBPCPANELALPHA</NavbarBrand>
      //     <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
      //     <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
      //       <ul className="navbar-nav flex-grow">
      //         <NavItem>
      //           <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
      //         </NavItem>
      //         <NavItem>
      //           <NavLink tag={Link} className="text-dark" to="/counter">Counter</NavLink>
      //         </NavItem>
      //         <NavItem>
      //           <NavLink tag={Link} className="text-dark" to="/fetch-data">Fetch data</NavLink>
      //         </NavItem>
      //         <NavItem>
      //          <Logout/>
      //         </NavItem>
      //       </ul>
      //     </Collapse>
      //   </Navbar>
      // </aside>
       <>
       <DrawerBox/>
       </>
    );
  }
}
