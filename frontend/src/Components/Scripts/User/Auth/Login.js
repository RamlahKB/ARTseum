import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {onLog, onGLog} from '../../../Redux/Auth/authAct';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
    constructor(props)
    {
        super();
        this.state = {
            email : "", password : "", hidden : true, modal : false,
            err1:"", err2:""
        };
    }
    componentDidMount=()=>{
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event){
            window.history.pushState(null, document.title,  window.location.href);
        });
    }
    togglePass=()=> {
        this.setState({ hidden: !this.state.hidden });
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    Valid=()=>{
        const {email, password} = this.state;
        let err1="", err2="";
        if (email === "")
        {
            err1 = "*Please Enter Email";
        }
        if (password === "")
        {
            err2 = "*Please Enter Password";
        }
        if (err1 || err2)
        {
            this.setState({
                err1, err2
            });     
            return false;       
        }
        return true;
    }
    Login=()=>{
        // console.log(this.state);
        const isValid = this.Valid();
        if (isValid)
        {
            const {email, password} = this.state;
            const userData = {email, password};
            this.props.onLog(userData, this.props.history);
        }
    }
    SuccGoogle=(data)=>{
        // console.log("success",data);
        // console.log("Profile : ",data.profileObj);
        const gdata = {tokenId : data.tokenId, googleId:data.googleId}
        this.props.onGLog(gdata, this.props.history);
    }
    FailGoogle=(data)=>{
        console.log("Failure : ",data);
    }
    render() {
        const {email, password, err1, err2} = this.state;
        // console.log(this.props);
        const errMsg = this.props.auth.err;
        return (
            <div className="container-fluid" style={{marginBottom: 150}}>
                <div className="row justify-content-center mt-5 mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-10"> 
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Login</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center" data-aos="zoom-in-up">
                    <div className="col-md-4 card py-3 px-5">
                        <h2 className="text-center text-info mt-3 mb-4">Login</h2>
                        {errMsg ? 
                            <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                {errMsg}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                        : null}
                        <div className="px-4 py-1">
                                <div className="validate">{err1}</div>
                                <div className="form-group">
                                    <input type="text" name="email" className="form-control form-control-sm"value={email} onChange={this.Handle} placeholder="Email"/>
                                </div>
                                <div className="validate">{err2}</div>
                                <div className="form-group">
                                <div class="input-group mb-3">
                                    <input type={this.state.hidden ? 'password' : 'text'} name="password" className="form-control form-control-sm" placeholder="Password" value={password} onChange={this.Handle} aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                                    <div class="input-group-append">
                                        <span className="input-group-text field-icon py-0" id="basic-addon2" onClick={this.togglePass}>
                                        {this.state.hidden ?
                                            <i class="far fa-eye"></i>
                                            :
                                            <i class="far fa-eye-slash"></i>
                                        }
                                        </span>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="text-center">
                                <button className="btn btn-primary mb-3" onClick={this.Login} data-toggle="modal" data-target="#msgMod">Login</button><br></br>
                                <small>Not A member? <Link to="/userReg">Click Here</Link></small>
                            </div>
                            <div className="text-center mt-3">
                                <GoogleLogin
                                    clientId="458279433769-qsheqt8c1luhh5pfdvojolj8ro6tdolh.apps.googleusercontent.com"
                                    buttonText="Login with Google"
                                    onSuccess={this.SuccGoogle}
                                    onFailure={this.FailGoogle}
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <small className="text-right mt-4"><Link to="/forgot">Forgot Password?</Link></small>
                    </div>
                </div>
                {/* <div className="modal fade" id="msgMod" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header bg-warning">
                                <h5 className="modal-title text-white" id="exampleModalLabel">Message</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span className="text-white" aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body p-5">
                                {errMsg ? 
                                    <p className="text-center text-danger">{errMsg}</p>
                                    :
                                    <p className="text-center text-danger">Logged In</p>
                                }
                            </div>
                            <div className="modal-footer justify-content-center">
                                <button type="button" className="btn btn-warning text-white" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div> */}
                
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps, {onLog, onGLog})(withRouter(Login));
