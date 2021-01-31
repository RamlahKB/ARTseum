import React, { Component } from 'react';
import {onNewPass} from './../Redux/Mail/mailAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class ResetPass extends Component {
    constructor(props)
    {
        super(props);
        console.log(this.props);
        this.state = {
            resTok : this.props.match.params.token, email : this.props.match.params.email, password : "", cpass : "",
            err1 : "", err2 : ""
        };
    }
    Valid=()=>{
        let passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/;
        const {password, cpass} = this.state;
        let err1="", err2="";
        if (password === "" || (!password.match(passRE)))
        {
            err1 = "*Password should contain at least 8 characters and at most 20, at least one digit, one upper case alphabet, one lower case alphabet and no white spaces.";
        }
        if (password !== cpass)
        {
            err2 = "*Please Enter Same Password";
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
    Handle=(e)=>{
        this.setState ({
            [e.target.name] : e.target.value
        });
    }
    Submit=()=>{
        const isValid = this.Valid();
        console.log(this.state);
        if (isValid)
        {
            const obj = {
                resTok : this.state.resTok,
                email : this.state.email,
                password : this.state.password
            };
            this.props.onNewPass(obj, this.props.history);
            console.log(this.props);
        }
    }
    render() {
        console.log(this.props);
        const {password, cpass, err1, err2} = this.state;
        return (
            <div className="container-fluid mt-5">
                <div className="row justify-content-center" style={{height: 600}}>
                    <div data-aos="flip-up" className="col-md-6 card py-3 px-5 align-self-center">
                        <h3 className="text-center text-info mb-4">Reset Password</h3>
                        {/* {sucMsg ? <p className="text-center text-primary">{sucMsg}</p> : ""}
                        {err ? <p className="text-center text-danger">{err}</p> : ""} */}
                        {/* <div className="validate">{err1}</div> */}
                        <div className="form-group">
                            <input hidden type="text" name="resTok" className="form-control"value={this.props.match.params.token}/>
                        </div>
                        <div className="form-group">
                            <input type="text" name="email" className="form-control"value={this.props.match.params.email}/>
                        </div>
                        <div className="validate">{err1}</div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" value={password} onChange={this.Handle} placeholder="New Password"/>
                        </div>
                        <div className="validate">{err2}</div>
                        <div className="form-group">
                            <input type="password" name="cpass" className="form-control" value={cpass} onChange={this.Handle} placeholder="Confirm Password"/>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mb-3" onClick={this.Submit}>Submit</button><br></br>
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

export default connect(mapStateToProps, {onNewPass})(withRouter(ResetPass)); 
