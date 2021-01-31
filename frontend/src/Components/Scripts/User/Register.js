import React, { Component } from 'react';
import {onReg} from './../../Redux/Auth/authAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class Register extends Component {
    constructor(props)
    {
        super();
        this.state = {
            name : "",email : "",password : "",cpass : "",contact : "",gender : "Prefer not to say", image : "",
            err1 : "",err2 : "",err3 : "",err4 : "",err5 : "",err6 : "",err7 : ""
        };
    }
    componentDidMount=()=>{
        bsCustomFileInput.init()
    }
    Valid=()=>{
        const {name, email, password, cpass, contact} = this.state;
        let err1="", err2="", err3="", err4="", err5="", err6="", err7="",
        emailRE = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
        passRE = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,20}$/;
        // (?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$
        // contRE1 = /^((\+){0,1}91(\s){0,1}(\-){0,1}(\s){0,1}){0,1}98(\s){0,1}(\-){0,1}(\s){0,1}[1-9]{1}[0-9]{7}$/,
        // contRE2 = /^0{0,1}[1-9]{1}[0-9]{2}[\s]{0,1}[\-]{0,1}[\s]{0,1}[1-9]{1}[0-9]{6}$/;
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
            err6 = "*Password should contain at least 8 characters and at most 20, at least one digit, one upper case alphabet, one lower case alphabet and no white spaces."
        }
        if (contact === "")
        {
            err4 = "*Please Enter Contact";
        }
        if (password !== cpass)
        {
            err7 = "*Please Enter Same Password";
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
            const fd = new FormData();
            fd.append("name", name);
            fd.append("email", email);
            fd.append("password", password);
            fd.append("contact", contact);
            fd.append("gender", gender);
            fd.append("image", image);
            this.setState({
                name : "",email : "",password : "",contact : "",gender : "",image : ""
            });
            this.props.onReg(fd, this.props.history);
        }
    }
    render() {
        const {name, email, password, cpass, contact, err1, err2, err3, err4, err5, err6, err7} = this.state;
        // console.log(this.props.auth);
        return (
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-10"> 
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Register</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center" data-aos="zoom-in-up">
                    <div className="col-md-4 col-sm-8 col-xs-10 card py-3 px-5">
                        <h2 className="text-center text-info mb-4 mt-3">Register</h2>
                        {this.props.auth.err ? <p className="text-center text-danger">{this.props.auth.err}</p> : null}
                        <div className="validate">{err1}</div>
                        <div className="form-group">
                            <input type="text" name="name" className="form-control form-control-sm" value={name} onChange={this.Handle} placeholder="Name"/>
                        </div>
                        <div className="validate">{err2}{err5}</div>
                        <div className="form-group">
                            <input type="text" name="email" className="form-control form-control-sm" value={email} onChange={this.Handle} placeholder="Email"/>
                        </div>
                        <div className="validate">{err3}{err6}</div>
                        <div className="form-group">
                            <input type="password" name="password" className="form-control form-control-sm" value={password} onChange={this.Handle} placeholder="Password"/>
                        </div>
                        <div className="validate">{err7}</div>
                        <div className="form-group">
                            <input type="password" name="cpass" className="form-control form-control-sm" value={cpass} onChange={this.Handle} placeholder="Confirm Password"/>
                        </div>
                        <div className="validate">{err4}</div>
                        <div className="form-group">
                            <input type="number" name="contact" className="form-control form-control-sm" value={contact} onChange={this.Handle} placeholder="Contact No."/>
                        </div>
                        <div className="form-group">
                            <label><span className="text_sm">Gender : </span></label><br/>
                            <input type="radio" name="gender" className="ml-3 mr-2" value="prefer not to say" onChange={this.Handle} checked={true}/><span className="text_sm">Prefer not to say</span><br/>
                            <input type="radio" name="gender" className="ml-3 mr-2" value="female" onChange={this.Handle}/><span className="text_sm">Female</span><br/>
                            <input type="radio" name="gender" className="ml-3 mr-2" value="male" onChange={this.Handle}/><span className="text_sm">Male</span>
                        </div>
                        <div className="input-group mb-2">
                            <div className="custom-file">
                                <input name="image" onChange={this.FileUpload} type="file" id="inputGroupFile03 form-control-sm" className="custom-file-input"/>
                                <label className="custom-file-label form-control-sm" for="inputGroupFile03">Choose file</label>
                            </div>
                        </div>
                        <div className="text-center">
                            <button className="btn btn-primary mb-3" onClick={this.Submit}>Register</button><br/>
                            <small>Already Registered? <Link to="/userLog">Click Here</Link></small>
                        </div>
                        <div className="text-center">
                            <div className="mt-4" style={{color: "blue", fontSize: 11}}>**Your data will not be disclosed.</div>
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

export default connect(mapStateToProps, {onReg})(withRouter(Register));
