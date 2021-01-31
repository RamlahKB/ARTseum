import React, { Component } from 'react';
import {onUpdUsr} from '../../../Redux/Auth/authAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {BreadcrumbItem, Breadcrumb} from 'reactstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class EditProf extends Component {
    constructor(props)
    {
        super(props);
        // console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        const {name, email,gender,contact} = this.props.auth.user;
        this.state = {
            id : id, name : name, email : email, gender : gender, image : null, contact : contact,
            err1 : ""
        };
    }
    componentDidMount(){
        bsCustomFileInput.init();
    }
    Handle=(e)=>{
        this.setState ({
            [e.target.name] : e.target.value
        });
    }
    FileUpload=(e)=>{
        // console.log(e.target.files[0]);
        this.setState({
            image : e.target.files[0]
        });
    }
    Submit=()=>{
        let emailRE = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        if (!this.state.email.match(emailRE))
        {
            this.setState({err1 : "*Please Enter Valid EmailID"});
        }
        else
        {
            const fd = new FormData();
            fd.append("id",this.state.id);
            fd.append("name",this.state.name);
            console.log(this.state.name);
            fd.append("email",this.state.email);
            fd.append("contact",this.state.contact);
            fd.append("gender",this.state.gender);
            fd.append("image",this.state.image);
            this.props.onUpdUsr(fd, this.props.history);
            this.setState({
                name : "", email : "", gender : "", image : "", contact : ""
            });
        }
    }
    render() {
        const {name, email, contact, err1} = this.state;
        console.log(this.state);
        return (
            <div className="container-fluid mt-5 mb-5">
                <div className="row justify-content-center mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                        <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Edit Artwork</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center" data-aos="zoom-in-up">
                    <div className="col-md-4 card py-3 px-5 mb-5">
                        <h3 className="text-center text-info mb-4 mt-4">Edit Profile</h3>
                            <div className="form-group">
                                <input type="text" name="name" className="form-control form-control-sm" value={name} onChange={this.Handle} placeholder="Name"/>
                            </div>
                            <div className="validate">{err1}</div>
                            <div className="form-group">
                                <input type="text" name="email" className="form-control form-control-sm"value={email} onChange={this.Handle} placeholder="Email"/>
                            </div>
                            <div className="form-group">
                                <input type="number" name="contact" className="form-control form-control-sm"value={contact} onChange={this.Handle} placeholder="Contact"/>
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
                                <button className="btn btn-primary mb-3" onClick={this.Submit}>Update</button><br></br>
                            </div>
                            <div className="text-center">
                                <small>Update Password? <Link to="/forgot">Click Here</Link></small>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    auth : state.auth
});

export default connect(mapStateToProps, {onUpdUsr})(withRouter(EditProf));