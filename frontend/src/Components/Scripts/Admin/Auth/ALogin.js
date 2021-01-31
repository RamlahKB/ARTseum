import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {onALog} from './../../../Redux/Auth/authAct';
import logo from "./../../../../logo1.png";

class ALogin extends Component {
    constructor(props)
    {
        super();
        this.state = {
            email : "", password : "", hidden : true
        };
    }
    togglePass=()=> {
        this.setState({ hidden: !this.state.hidden });
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    ALogin=()=>{
        console.log(this.state);
        const {email, password} = this.state;
        const adminData = {email, password};
        this.props.onALog(adminData, this.props.history);
    }
    render() {
        const {email, password} = this.state;
        console.log(this.props);
        const errMsg = this.props.adAuth.err;
        return (
            <div className="container-fluid mt-5" data-aos="zoom-in-up">
                <div className="row justify-content-center" style={{height: 600}}>
                    <div className="col-md-8 card align-self-center py-5">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-12 col-sm-12 align-self-center text-center">
                                <img alt="logo" src={logo} style={{borderRadius: "10px"}} />
                            </div>
                            <div className="col-lg-6 col-md-12 col-sm-12 py-3 px-5 border-left">
                                <h2 className="text-center text-info mb-4 mt-3">Login</h2>
                                {errMsg ? 
                                    <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                        {errMsg}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                : null}
                                <div className="form-group">
                                    <input type="text" name="email" className="form-control form-control-sm"value={email} onChange={this.Handle} placeholder="Email"/>
                                </div>
                                <div className="form-group">
                                    <div class="input-group">
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
                                <div className="text-center">
                                    <button className="btn btn-primary mb-3" onClick={this.ALogin}>Login</button><br></br>
                                    <small><Link to="/adminReg">Click Here</Link> to Register</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    adAuth : state.adAuth
});

export default connect(mapStateToProps, {onALog})(withRouter(ALogin));
