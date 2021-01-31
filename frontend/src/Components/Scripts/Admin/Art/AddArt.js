import React, { Component } from 'react';
import {onAddArt} from './../../../Redux/Art/artAct';
import {onFetchCat} from '../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Spinner, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class AddArt extends Component {
    constructor(props)
    {
        super();
        this.state = {
            name : "", catg : "", artist : "",year : "", desc : "", image : "", author_id : "", status : "",
            err1 : "", err2 : "", err3 : "", err4 : "", err5 : "", err6 : ""
        };
    }
    componentDidMount=()=>{
        this.getAllCat();
        bsCustomFileInput.init();
    }
    getAllCat=()=>{
        this.props.onFetchCat();
    }
    Valid=()=>{
        const {name, artist, year, desc, image, catg} = this.state;
        let err1="", err2="", err3="", err4="", err5="", err6="";
        if (name === "")
        {
            err1 = "*Please Enter Name";
        }
        if (artist === "")
        {
            err2 = "*Please Enter Artist";
        }
        if (year === "")
        {
            err3 = "*Please Enter Year";
        }
        if (desc === "")
        {
            err4 = "*Please Enter Description";
        }
        if (image === "")
        {
            err5 = "*Please Upload Image Valid Image (*.jpg, *.png, *.jpeg, *.gif)";
        }
        if (catg === "")
        {
            err6 = "*Please Select Category";
        }
        if (err1 || err2 || err3 || err4 || err5 || err6)
        {
            this.setState({
                err1, err2, err3, err4, err5, err6
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
        const atoken = localStorage.getItem("admin");
        var obj;
        if (isValid)
        {
            if (atoken)
            {
                obj = {
                    name : this.state.name,
                    catg : this.state.catg,
                    artist : this.state.artist,
                    year : this.state.year,
                    desc : this.state.desc,
                    image : this.state.image,
                    author_id : this.props.adAuth.admin.id,
                    status : "GP"
                };
            }
            else
            {
                obj = {
                    name : this.state.name,
                    catg : this.state.catg,
                    artist : this.state.artist,
                    year : this.state.year,
                    desc : this.state.desc,
                    image : this.state.image,
                    author_id : this.props.auth.user.id,
                    status : "NP"
                };
            }
            this.props.onAddArt(obj);
            this.setState({
                name : "",catg : "",artist : "",year : "",desc : "",image : "",author_id : ""
            });
            console.log(this.props.cat);
        }
    }
    render() {
        const {name, artist, year, desc,image, err1, err2, err3, err4, err5, err6} = this.state;
        const {sucMsg, err} = this.props.art;
        // console.log("Cat cons : "+this.props);
        const {categ, dataState} = this.props.cat;
        console.log(this.props);
        const token = localStorage.getItem("user");
        const atoken = localStorage.getItem("admin");
        if (token || atoken)
        {
            if(dataState === "NOT_INIT" || dataState === "FETCHING")
            {
                return (
                    <div className="container mt-5 text-center">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Add Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <Spinner color="primary" />
                    </div>
                )
            }
            else 
            {
                return (
                    <div className="container-fluid mt-5 mb-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Add Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className="row justify-content-center" data-aos="zoom-in-up">
                            <div className="col-md-4 card py-3 px-5">
                                <h3 className="text-center text-info mb-4">Add Artwork</h3>
                                {sucMsg ? <p className="text-primary text-center">{sucMsg}</p> : ""}
                                {err ? <p className="text-danger text-center">{err}</p> : ""}
                                <div className="validate">{err1}</div>
                                <div className="form-group">
                                    <input type="text" name="name" className="form-control form-control-sm" value={name} onChange={this.Handle} placeholder="Name"/>
                                </div>
                                <div className="validate">{err6}</div>
                                <div className="form-group">
                                    <select className="form-control form-control-sm" name="catg" onChange={this.Handle}>
                                        <option>-- Select Category --</option>
                                        {categ.map((el,i)=>(
                                            <option key={i} value={el._id}>
                                                {el.category}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="validate">{err2}</div>
                                <div className="form-group">
                                    <input type="text" name="artist" className="form-control form-control-sm" value={artist} onChange={this.Handle} placeholder="Artist"/>
                                </div>
                                <div className="validate">{err3}</div>
                                <div className="form-group">
                                    <input type="text" name="year" className="form-control form-control-sm" value={year} onChange={this.Handle} placeholder="Year"/>
                                </div>
                                <div className="validate">{err4}</div>
                                <div className="form-group">
                                    <input type="text" name="desc" className="form-control form-control-sm" value={desc} onChange={this.Handle} placeholder="Description"/>
                                </div>
                                <div className="validate">{err5}</div>
                                <div className="input-group mb-2">
                                    <div className="custom-file">
                                        <input name="image" onChange={this.FileUpload} type="file" id="inputGroupFile03 form-control-sm" className="custom-file-input"/>
                                        <label className="custom-file-label form-control-sm" for="inputGroupFile03">Choose file</label>
                                    </div>
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
        else
        {
            return (
                <div className="container-fluid mt-5" style={{height: 570, position: "relative"}}>
                    <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Add Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    <div className="row justify-content-center">
                        <div className="col-md-6 card py-3 px-5"style={{position: "absolute", top: 200}}>
                            <h3 className="text-center text-info mb-4 mt-2">For exhibiting your artwork, please 
                                <Link className="ml-2" style={{color: "#ff0000"}} to="/userLog">LOGIN</Link>
                            </h3>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps=(state)=>({
    art : state.art,
    cat : state.cat,
    auth :state.auth,
    adAuth : state.adAuth
});

export default connect(mapStateToProps, {onAddArt, onFetchCat})(withRouter(AddArt));
