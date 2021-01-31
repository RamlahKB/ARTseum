import React, { Component } from 'react';
import {onMailReq} from './../Redux/Mail/mailAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

class Forgot extends Component {
    constructor(props)
    {
        super(props);
        this.state = {
            email : "", modal : false,
            err1 : ""
        };
    }
    // errModS=()=>{
    //     if (!this.props.mail === null)
    // }
    Handle=(e)=>{
        this.setState ({
            [e.target.name] : e.target.value
        });
    }
    Submit=()=>{
        let emailRE = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        // console.log("Email : "+this.state.email);
        if((this.state.email === null) || (!this.state.email.match(emailRE)))
        {
            this.setState({
                err1 : "*Please Enter Valid ID."
            });
        }
        else
        {
            this.props.onMailReq({email : this.state.email}, this.props.history);
        }
        console.log(this.props);
    }
    render() {
        const {email, err1} = this.state;
        console.log(this.props);
        const token = localStorage.getItem("user");
        // console.log(this.props.auth.sMsg);
        const {sMsg, err} = this.props.mail;
        return (
            <div className="container-fluid mt-5" style={{marginBottom: 200}}>
                <div className="row justify-content-center mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        {token ? 
                            <BreadcrumbItem active tag="span">Update Password</BreadcrumbItem>
                            :
                            <BreadcrumbItem active tag="span">Forgot Password</BreadcrumbItem>
                        }
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center">
                    <div data-aos="flip-up" className="col-md-4 card py-3 px-5">
                        {token ? 
                            <h3 className="text-center text-info mb-4 mt-4">Update Password</h3> 
                            : 
                            <h3 className="text-center text-info mb-4 mt-4">Forgot Password</h3>
                        }
                        {/* {sMsg ? <p className="text-center text-primary">{sMsg}</p> : null}
                        { sMsg === null ? <div>{err ? <div className="text-center text-danger mb-2">{err}</div> : null}</div> : null} */}
                        <div className="validate">{err1}</div>
                        <div className="form-group">
                            <input type="text" name="email" className="form-control form-control-sm" value={email} onChange={this.Handle} placeholder="Email ID"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mb-3" onClick={this.Submit} data-toggle="modal" data-target="#msgMod">Submit</button><br></br>
                        </div>
                        {token ? null :
                            <small className="text-center mt-2 mb-2"><Link to="/userReg">Register as new user</Link></small>
                        }
                        <div className="text-center ">
                                <div style={{color: "#fc6363", fontSize: 11}}>**Passwords linked with Google accounts cannot be recovered or updated here</div>
                            </div>
                    </div>
                </div>
                <div className="modal fade" id="msgMod" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-warning">
                                <h5 className="modal-title text-white" id="exampleModalLabel">Message</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className="text-white" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-5">
                                { sMsg ? <p className="text-center text-primary">{sMsg}</p> : null}
                                { sMsg === null ? <div>{err ? <div className="text-center text-danger mb-2">{err}</div> : null}</div> : null}
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-warning text-white" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=(state)=>({
    mail : state.mail
});

export default connect(mapStateToProps, {onMailReq})(withRouter(Forgot)); 
