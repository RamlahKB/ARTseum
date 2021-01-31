import React, { Component } from 'react';
import {onEditCat, onUpdCat} from '../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {BreadcrumbItem, Breadcrumb} from 'reactstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class EditCat extends Component {
    constructor(props)
    {
        super(props);
        // console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        this.state = {
            id : "", category : "", image : "",o_image:"", err1 : "", err2 : ""
        };
        this.EdCat(id);
    }
    componentDidMount=()=>{
        bsCustomFileInput.init()
    }
    EdCat=async(id)=>{
        const res = await this.props.onEditCat(id);
        this.setState({
            id : res._id,
            category : res.category,
            o_image : res.image
        });
        console.log(this.state);
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
        if (err1)
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
        // console.log(e.target.files[0]);
        this.setState({
            image : e.target.files[0]
        });
    }
    Submit=()=>{
        const isValid = this.Valid();
        console.log(this.state.image);
        if (isValid)
        {
            const fd = new FormData();
            fd.append("id", this.state.id);
            fd.append("category", this.state.category);
            if(this.state.image === "")
            {fd.append("image", this.state.o_image);}
            else
            {fd.append("image", this.state.image);}
            this.props.onUpdCat(fd, this.props.history);
            this.setState({
                category : "", image : ""
            });
        }
    }
    render() {
        const {category, err1, err2} = this.state;
        // console.log(this.props);
        const {sucMsg, err} = this.props.cat;
        return (
            <div className="container-fluid mt-5">
                <div className="row justify-content-center mb-4">
                    <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                        <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                        <BreadcrumbItem active tag="span">Edit Category</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="row justify-content-center" data-aos="zoom-in-up">
                    <div className="col-md-4 card py-3 px-5">
                        <h3 className="text-center text-info mb-4 mt-3">Edit Category</h3>
                        {sucMsg ? <p className="text-center text-primary">{sucMsg}</p> : ""}
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
                                <button className="btn btn-primary mb-3" onClick={this.Submit}>Update</button><br></br>
                            </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps=state=>({
    cat : state.cat
});

export default connect(mapStateToProps, {onEditCat, onUpdCat})(withRouter(EditCat));
