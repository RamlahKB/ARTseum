import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {onLog, onGLog} from './../../Redux/Auth/authAct';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { GoogleLogin } from 'react-google-login';

class Login extends Component {
    constructor(props)
    {
        super();
        this.state = {
            email : "",
            password : ""
        };
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    Login=()=>{
        // console.log(this.state);
        const {email, password} = this.state;
        const userData = {email, password};
        this.props.onLog(userData, this.props.history);
    }
    SuccGoogle=(data)=>{
        console.log("Success : "+data);
        console.log("Profile : "+data.profileObj);
        const gdata = {tokenId : data.tokenId}
        this.props.onGLog(gdata, this.props.history);
    }
    FailGoogle=(data)=>{
        console.log("Failure : "+data);
    }
    render() {
        const {email, password} = this.state;
        console.log(this.props);
        const errMsg = this.props.auth.err;
        return (
            <div className="container-fluid mt-5" style={{marginBottom: 150}}>
                <div className="row justify-content-center mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-10"> 
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Login</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center" data-aos="zoom-in-up">
                    <div className="col-md-4 card py-3 px-5">
                        <h2 className="text-center text-info mb-4">Login</h2>
                        {errMsg ? <p className="text-center text-danger">{errMsg}</p> : null}
                        <div className="form-group">
                            <input type="text" name="email" className="form-control form-control-sm"value={email} onChange={this.Handle} placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control form-control-sm" value={password} onChange={this.Handle} placeholder="Password"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mb-3" onClick={this.Login}>Login</button><br></br>
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
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps, {onLog, onGLog})(withRouter(Login));
