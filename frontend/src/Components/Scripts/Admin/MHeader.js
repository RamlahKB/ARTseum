import React, { Component } from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Button
} from 'reactstrap';
import {onALogout} from './../../Redux/Auth/authAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu';
import logo from "./../../../logo1.png";

class MHeader extends Component {
    ALogout=()=>{
        console.log("ALogout");
        this.props.onALogout(this.props.history);
    }
    render() {
        const {name, image} = this.props.adAuth.admin;
        const atoken = localStorage.getItem("admin");
        return (
            <div>
                <Menu light>
                    <center className="mb-5">
                        <div>
                            <img src={logo} alt="logo" className="logo mb-4"/>
                        </div>
                        {image ? 
                            <img alt="Admin" className="rounded-circle mt-2 mb-3" height="auto" width="100" src={`http://localhost:2000/${image}`}/>
                            :
                            <i className="fa fa-user-o fa_user fa-3x mb-4" height="80px"></i>
                        }
                        <h4 className="text-white text-uppercase">{name}</h4>
                    </center>
                    <a href="/dash">
                        <i className="fa fa-desktop pr-4" aria-hidden="true"></i>
                        <span>Dashboard</span>
                    </a>
                    <a href="/admCat">
                        <i className="fa fa-th pr-4" aria-hidden="true"></i>
                        <span>Categories</span>
                    </a>
                    <a href="/admArt">
                        <i className="fa fa-paint-brush pr-4" aria-hidden="true"></i>
                        <span>Artwork</span>
                    </a>
                    <a href="/admCom">
                        <i class="far fa-comment-dots pr-4"></i>
                        <span>Comments</span>
                    </a>
                </Menu>
                <Navbar color="dark" dark expand="md">
                    <NavbarBrand href="/">
                        <img src={logo} alt="logo" className="logo"/>
                        <h6 style={{display:"inline"}}><small className="ml-2">ADMIN</small></h6>
                    </NavbarBrand>
                    <Nav className="ml-auto" navbar>
                            {
                                atoken ? 
                                <NavItem className="mt-1">
                                    <Button color="warning" onClick={this.ALogout}>Logout</Button>
                                </NavItem>
                                :
                                ""
                            }
                    </Nav>
                </Navbar>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    adAuth :state.adAuth
});

export default connect(mapStateToProps, {onALogout})(withRouter(MHeader));
