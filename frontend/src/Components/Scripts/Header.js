import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    // NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    // NavbarText,
    Button
} from 'reactstrap';
import {onLogout} from './../Redux/Auth/authAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import logo from "./../../logo1.png";
import MHeader from './Admin/MHeader';

class Header extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            isOpen : false,
            dropdownOpen : false
        }
    }
    toggle=()=>{
        this.setState({
            isOpen : !this.state.isOpen
        });
    }
    Dtoggle=()=>{
        this.setState({
            dropdownOpen : !this.state.dropdownOpen
        });
    }
    Logout=()=>{
        console.log("Logout");
        this.props.onLogout(this.props.history);
    }
    render() {
        console.log(this.props);
        const {isOpen} = this.state;
        const token = localStorage.getItem("user");
        const atoken = localStorage.getItem("admin");
        const {pathname} = this.props.history.location;
        const {name, image} = this.props.auth.user;
		if (pathname === "/adminLog" || pathname === "/adminReg" || pathname.includes("/newPass/"))
        {return null;}
        else
        {
            if (atoken)
            {
                return (
                    <MHeader/>
                )
            }
            else
            {
                return (
                    <div>
                        <Navbar color="dark" dark expand="md" className="mb-0">
                            <NavbarBrand href="/">
                                <img src={logo} alt="logo" className="logo"/>
                            </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    {token ? 
                                        <NavItem className="m-0 p-0">
                                            {image ? 
                                                <img alt="User" className="rounded-circle mr-3" height="40" width="auto" src={`http://localhost:2000/${image}`}/>
                                            :
                                                <i className="far fa-user text-white fa-2x mr-3"></i>
                                            }
                                            <Link to="/usrProf" className="text-white mt-3 mr-2 text-uppercase text-decoration-none">Welcome {name}</Link> 
                                        </NavItem>
                                        : null
                                    }
                                    <NavItem>
                                        <Link className="nav-link" to="/">HOME</Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link className="nav-link" to="/cat">CATEGORY</Link>
                                    </NavItem>
                                    <UncontrolledDropdown nav inNavbar>
                                        <DropdownToggle nav caret>
                                            ARTWORK
                                        </DropdownToggle>
                                        <DropdownMenu left className="text-center">
                                            <DropdownItem tag={Link} to="/art" className="h5">
                                            VIEW
                                            </DropdownItem>
                                            {token ?
                                                <DropdownItem tag={Link} to="/addArt">
                                                ADD
                                                </DropdownItem>
                                            : 
                                                <DropdownItem tag={Link} to="/userLog">
                                                ADD
                                                </DropdownItem> 
                                            }
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    {token ? null :
                                        <NavItem>
                                            <Link className="nav-link" to="/userReg">REGISTER</Link>
                                        </NavItem>
                                    }
                                    {token ? null :
                                        <NavItem>
                                            <Link className="nav-link" to="/userLog">LOGIN</Link>
                                        </NavItem>
                                    }
                                    {token ?
                                        <NavItem className="mt-1 ml-2">
                                            <Button className="m-0" color="warning" onClick={this.Logout}>LOGOUT</Button>
                                        </NavItem>
                                    : null }
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps=(state)=>({
    auth :state.auth
});

export default connect(mapStateToProps, {onLogout})(withRouter(Header));
