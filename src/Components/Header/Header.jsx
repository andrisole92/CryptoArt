import React    from "react";

import './Header.css';
import {Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

class Header extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            collapsed: true
        }
    }
    render() {
        return (
            <div>
                <Navbar color="faded" light>
                    <NavbarBrand href="/" className="mr-auto">reactstrap</NavbarBrand>
                    <NavbarToggler onClick={() => this.setState({collapsed: !this.state.collapsed})} className="mr-2" />
                    <Collapse isOpen={!this.state.collapsed} navbar>
                        <Nav navbar>
                            <NavItem>
                                <NavLink href="/my-cabinet">My Cabinet</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/sign-in">Create Account</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default Header;
