import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {onLog} from './../../Redux/Auth/authAct';

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
    render() {
        const {email, password} = this.state;
        console.log(this.props);
        const errMsg = this.props.auth.err;
        return (
            <div className="container-fluid mt-5" style={{marginBottom: 270}}>
                <div className="row justify-content-center">
                    <div className="col-md-6 card py-3 px-5">
                        <h2 className="text-center text-info mb-4">Login</h2>
                        {errMsg ? <p className="text-center text-danger">{errMsg}</p> : null}
                        <div className="form-group">
                            <input type="text" name="email" className="form-control"value={email} onChange={this.Handle} placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" value={password} onChange={this.Handle} placeholder="Password"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mb-3" onClick={this.Login}>Login</button><br></br>
                            <small>Not A member? <Link to="/userReg">Click Here</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state =>({
    auth : state.auth
});

export default connect(mapStateToProps, {onLog})(withRouter(Login));
