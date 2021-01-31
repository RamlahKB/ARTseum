import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {onReg} from './../../Redux/Auth/authAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Register extends Component {
    constructor(props)
    {
        super();
        this.state = {
            name : "",
            email : "",
            password : "",
            contact : "",
            gender : "",
            // image : ""
            err1 : "",
            err2 : "",
            err3 : "",
            err4 : "",
            err5 : "",
            err6 : "",
            err7 : ""
        };
    }
    Valid=()=>{
        const {name, email, password, contact} = this.state;
        let err1="", err2="", err3="", err4="", err5="", err6="", err7="",
        emailRE = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
        passRE = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/,
        contRE1 = /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/,
        contRE2 = /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/;
        if (name === "")
        {
            err1 = "*Please Enter Name";
        }
        if (email === "")
        {
            err2 = "*Please Enter Email";
        }
        if (!email.match(emailRE))
        {
            err5 = "*Please Enter Valid ID"
        }
        if (password === "")
        {
            err3 = "*Please Enter Password";
        }
        if (!password.match(passRE))
        {
            err6 = "*Password should contain at least 8 characters and at most 20, at least one digit, one upper case alphabet, one lower case alphabet, one special character[!@#$%&*()-+=^], and no white spaces."
        }
        if (contact === "")
        {
            err4 = "*Please Enter Contact";
        }
        if (!contact.match(contRE1) || !contact.match(contRE2))
        {
            err7 = "*Please Enter Valid Contact No."
        }
        if (err1 || err2 || err3 || err4 || err5 || err6 || err7)
        {
            this.setState({
                err1, err2, err3, err4, err5, err6, err7
            });     
            return false;       
        }
        return true;
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    FileUpload=(e)=>{
        console.log(e.target.files[0]);
        this.setState({
            image : e.target.files[0]
        });
    }
    Submit=()=>{
        const isValid = this.Valid();
        console.log(this.state);
        const {name, email, password, contact, gender, image} = this.state;
        if (isValid)
        {
            const newUser = {
                name, email, password, contact, gender, image
            }
            this.setState({
                name : "",
                email : "",
                password : "",
                contact : "",
                gender : "",
                image : ""
            });
            this.props.onReg(newUser, this.props.history);
        }
    }
    render() {
        const {name, email, password, contact, err1, err2, err3, err4, err5, err6, err7} = this.state;
        return (
            <div className="container-fluid mt-5" style={{marginBottom: 70}}>
                <div className="row justify-content-center">
                    <div className="col-md-6 card py-3 px-5">
                        <h2 className="text-center text-info mb-4">Register</h2>
                        <div className="validate">{err1}</div>
                        <div className="form-group">
                            <input type="text" name="name" className="form-control" value={name} onChange={this.Handle} placeholder="Name"/>
                        </div>
                        <div className="validate">{err2}{err5}</div>
                        <div className="form-group">
                            <input type="text" name="email" className="form-control" value={email} onChange={this.Handle} placeholder="Email"/>
                        </div>
                        <div className="validate">{err3}{err6}</div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control" value={password} onChange={this.Handle} placeholder="Password"/>
                        </div>
                        <div className="validate">{err4}{err7}</div>
                        <div className="form-group">
                            <input type="number" name="contact" className="form-control" value={contact} onChange={this.Handle} placeholder="Contact No."/>
                        </div>
                        <div className="form-group">
                            <label>Gender : </label><br></br>
                            <input type="radio" name="gender" className="ml-3 mr-2 form-control-check" value="female" onChange={this.Handle}/>Female<br></br>
                            <input type="radio" name="gender" className="ml-3 mr-2 form-control-check" value="male" onChange={this.Handle}/>Male
                        </div>
                        {/* <div className="form-group">
                            <label>Image</label><br></br>
                            <input type="file" name="image" className="form-control-file" onChange={this.FileUpload}/>
                        </div> */}
                        <div className="text-center">
                            <button className="btn btn-primary mb-3" onClick={this.Submit}>Register</button><br></br>
                            <small>Already Registered? <Link to="/userLog">Click Here</Link></small>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {onReg})(withRouter(Register));
