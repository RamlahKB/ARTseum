import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem, Button} from 'reactstrap';
import {onUserDel} from './../../../Redux/Auth/authAct';

class UsrProf extends Component {
    // constructor(props)
    // {
    //     super(props);
    //     this.state = {
    //         id : "",
    //     };
    // }
    Handle=(e)=>{
        this.setState ({
            [e.target.name] : e.target.value
        });
    }
    Delete=(id)=>{
        this.props.onUserDel(id, this.props.history);
        console.log("del : "+id);
        // if(res)
        // {
        //     this.getAllArt();
        //     // this.props.onFetchArt();
        // }
    }
    render() {
        console.log(this.props);
        const {name, image, contact, email, gender, id, googleId} = this.props.auth.user;
        return (
            <div className="container mt-5 text-center mb-5">
                <div className="row justify-content-center mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Profile</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-5 card py-5 px-5 mb-5">
                        {googleId === null ?
                            <div className="edit_prof">
                                <Button tag={Link} className="text-center m-1 mt-2" to={`editProf/${id}`}>
                                    <i className="fas fa-edit" aria-hidden="true"></i>
                                </Button>
                            </div>
                        : null }
                        <div className="px-5 position-relative" style={{borderRadius:"7px",border:"2px solid rgb(194 193 193)"}}>
                            
                            <div className="text-center">
                                <h2 className="text-center text-info mt-3">Profile</h2>
                                {image === null ? 
                                    <i className="far fa-user rounded-circle mb-5 mt-4 bg-gray fa-5x fa_user"></i>
                                    :
                                    <img alt="User" className="rounded-circle img-fluid mb-4 mt-4" width="100px" src={`http://localhost:2000/${image}`}/>
                                }
                            </div>
                            <div>
                                <table className="table mb-2">
                                    {googleId === null ?
                                        <tbody>
                                            <tr>
                                                <th className="text-right" scope="row">Name</th>
                                                <td className="text-left">{name}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-right" scope="row">Email</th>
                                                <td className="text-left">{email}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-right" scope="row">Contact No.</th>
                                                <td className="text-left">{contact}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-right" scope="row">Gender</th>
                                                <td className="text-left">{gender}</td>
                                            </tr>
                                        </tbody>
                                        : 
                                        <tbody>
                                            <tr>
                                                <th className="text-right" scope="row">Name</th>
                                                <td className="text-left">{name}</td>
                                            </tr>
                                            <tr>
                                                <th className="text-right" scope="row">Email</th>
                                                <td className="text-left">{email}</td>
                                            </tr>
                                        </tbody>
                                    }
                                </table>
                                {googleId === null ?
                                    <div className="text-center mb-3">
                                        <button className="btn-sm btn btn-block btn-danger" data-toggle="modal" data-target="#delete">Delete My Account</button>
                                    </div>
                                : null }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-danger justify-content-center text-center">
                                <h5 className="modal-title text-white font-weight-bold" id="exampleModalLabel">DELETE</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center p-4">
                                Are you sure you want to delete this account?<br/>
                                <small className="mt-2 text-danger">**This action cannot be undone!</small>
                            </div>
                            <div className="modal-footer justify-content-center text-center">
                                <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>this.Delete(id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    auth : state.auth
});

export default connect(mapStateToProps, {onUserDel})(withRouter(UsrProf));
