import React, { Component } from 'react';
import {onEditArt, onUpdArt} from './../../../Redux/Art/artAct';
import {onFetchCat} from './../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb} from 'reactstrap';
import bsCustomFileInput from 'bs-custom-file-input';

class EditArt extends Component {
    constructor(props)
    {
        super(props);
        // console.log(this.props.match.params.id);
        const id = this.props.match.params.id;
        this.state = {
            id : "", name : "", catg : "", artist : "", year : "", desc : "", image : "",o_image:"",
            err1 : "", err2 : "", err3 : "", err4 : "", err5 : "", err6 : ""
        };
        this.EdArt(id);
    }
    componentDidMount(){
        this.getAllCat();
        bsCustomFileInput.init();
    }
    getAllCat=()=>{
        this.props.onFetchCat();
    }
    EdArt=async(id)=>{
        const res = await this.props.onEditArt(id);
        this.setState({
            id : res._id,
            name : res.name,
            catg : res.catg,
            artist : res.artist,
            year : res.year,
            desc : res.desc,
            o_image : res.image,
        });
    }
    Valid=()=>{
        const {name, artist, year, desc} = this.state;
        let err1="", err2="", err3="", err4="";
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
        if (err1 || err2 || err3 || err4)
        {
            this.setState({
                err1, err2, err3, err4
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
    FileUpload=(e)=>{
        // console.log(e.target.files[0]);
        this.setState({
            image : e.target.files[0]
        });
    }
    Submit=()=>{
        const isValid = this.Valid();
        // console.log(this.state.id);
        if (isValid)
        {
            const fd = new FormData();
            fd.append("id",this.state.id);
            fd.append("name",this.state.name);
            fd.append("artist",this.state.artist);
            fd.append("catg",this.state.catg);
            fd.append("year",this.state.year);
            fd.append("desc",this.state.desc);
            if(this.state.image === "")
            {fd.append("image", this.state.o_image);}
            else
            {fd.append("image", this.state.image);}
            this.props.onUpdArt(fd, this.props.history);
            this.setState({
                name : "", catg : "", artist : "", year : "", desc : "", image : ""
            });
        }
    }
    render() {
        const atoken = localStorage.getItem("admin");
        const {name, artist, year, desc, err1, err2, err3, err4} = this.state;
        console.log(this.props);
        const {sucMsg, err} = this.props.art;
        const {categ, dataState} = this.props.cat;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                            <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Spinner color="primary" />
                </div>
            )
        }
        else 
        {
            return (
                <div className="container-fluid mt-5">
                    <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-11"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Edit Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                    <div className="row justify-content-center" data-aos="zoom-in-up">
                        <div className="col-md-6 card py-3 px-5">
                            <h3 className="text-center text-info mb-4">Edit Artwork</h3>
                            {sucMsg ? <p className="text-center text-primary">{sucMsg}</p> : ""}
                            {err ? <p className="text-center text-danger">{err}</p> : ""}
                            <div className="validate">{err1}</div>
                            <div className="form-group">
                                <input type="text" name="name" className="form-control form-control-sm"value={name} onChange={this.Handle} placeholder="Name"/>
                            </div>
                            <div className="form-group">
                                <select className="form-control form-control-sm" name="catg" onChange={this.Handle}>
                                    <option>--Select Category--</option>
                                    {categ.map((el,i)=>(
                                        <option key={i} value={el._id} >
                                            {el.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="validate">{err2}</div>
                            <div className="form-group">
                                <input type="text" name="artist" className="form-control form-control-sm"value={artist} onChange={this.Handle} placeholder="Artist"/>
                            </div>
                            <div className="validate">{err3}</div>
                            <div className="form-group">
                                <input type="text" name="year" className="form-control form-control-sm"value={year} onChange={this.Handle} placeholder="Year"/>
                            </div>
                            <div className="validate">{err4}</div>
                            <div className="form-group">
                                <input type="text" name="desc" className="form-control form-control-sm"value={desc} onChange={this.Handle} placeholder="Description"/>
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
                        </div>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps=state=>({
    art : state.art,
    cat : state.cat
});

export default connect(mapStateToProps, {onEditArt, onUpdArt, onFetchCat})(withRouter(EditArt));
