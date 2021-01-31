import React, { Component } from 'react';
import {onAddCat} from '../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class AddCat extends Component {
    constructor(props)
    {
        super();
        this.state = {
            category : "", image : "", author_id : "",
            err1 : "", err2 : ""
        };
    }
    componentDidMount=()=>{
        bsCustomFileInput.init()
    }
    Valid=()=>{
        const {category, image} = this.state;
        let err1="", err2="";
        if (category === "")
        {
            err1 = "*Please Enter Category";
        }
        if (image === "")
        {
            err2 = "*Please Upload Image Valid Image (*.jpg, *.png, *.jpeg, *.gif)";
        }
        if (err1 || err2)
        {
            this.setState({ err1, err2 });     
            return false;       
        }
        return true;
    }    
    Handle=(e)=>{
        this.setState ({
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
        if (isValid)
        {
            const obj = {
                category : this.state.category,
                image : this.state.image,
                author_id : this.props.adAuth.admin.id
            };
            this.props.onAddCat(obj, this.props.history);
            this.setState({
                category : "",
                image : "",
                author_id : "",
                err1 : "",
                err2 :""
            });
        }
    }
    render() {
        const {category, err1, err2} = this.state;
        console.log(this.props);
        const {sucMsg, err} = this.props.cat;
        return (
                <div className="container-fluid mt-5 mb-5">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                            <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Add Category</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className="row justify-content-center mb-5" data-aos="zoom-in-up">
                        <div className="col-md-4 card py-3 px-5 mb-5">
                            <h3 className="text-center text-info mb-4 mt-4">Add Category</h3>
                            {/* {sucMsg ? <p className="text-center text-primary">{sucMsg}</p> : ""} */}
                            {err ? 
                                    <div class="alert alert-danger alert-dismissible fade show mt-2" role="alert">
                                        {err}
                                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                : null}
                                <div className="validate">{err1}</div>
                                <div className="form-group">
                                    <input type="text" name="category" className="form-control form-control-sm"value={category} onChange={this.Handle} placeholder="Category"/>
                                </div>
                                <div className="validate">{err2}</div>
                                <div className="input-group mb-2">
                                    <div className="custom-file">
                                        <input name="image" onChange={this.FileUpload} type="file" id="inputGroupFile03 form-control-sm" className="custom-file-input"/>
                                        <label className="custom-file-label form-control-sm" for="inputGroupFile03">Choose file</label>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-primary mb-3" data-toggle="modal" data-target="#msgMod"  onClick={this.Submit}>Submit</button><br></br>
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
                                    <div className="modal-body p-3">
                                        {sucMsg ? <p className="text-primary text-center">{sucMsg}</p> : ""}
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

const mapStateToProps=state=>({
    cat : state.cat,
    adAuth : state.adAuth
});

export default connect(mapStateToProps, {onAddCat})(withRouter(AddCat));
