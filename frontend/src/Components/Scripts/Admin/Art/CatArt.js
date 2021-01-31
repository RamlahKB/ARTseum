import React, { Component } from 'react';
import {onFetchArt, onArtDel} from './../../../Redux/Art/artAct';
import {onFetchCat, onFetchCatArt} from './../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Spinner, Breadcrumb, BreadcrumbItem} from 'reactstrap';

class CatArt extends Component {
    componentDidMount=()=>{
        // this.getAllArt();
        // this.props.onFetchArt();
        this.props.onFetchCat();
        this.props.onFetchCatArt();
    }
    Like=async(id)=>{
        console.log(id);
        if(localStorage.getItem("admin") || localStorage.getItem("user"))
        {
            const res = await this.props.onLike(id);
            if(res)
            {
                this.props.onFetchArt();
            }
        }
        else
        {alert("Please Login");}
    }
    DisLike=async(id)=>{
        console.log(id);
        if(localStorage.getItem("admin") || localStorage.getItem("user"))
        {
            const res = await this.props.onDLike(id);
            if(res)
            {
                this.props.onFetchArt();
            }
        }
        else
        {alert("Please Login");}
    }
    Delete=async(id)=>{
        const res = await this.props.onArtDel(id);
        if(res)
        {
            // this.getAllArt();
            this.props.onFetchArt();
        }
    }
    Edit=(id)=>{
        console.log(id);
        this.props.onArtDel(id, this.props.history);
    }
    render() {
        console.log(this.props);
        const atoken = localStorage.getItem("admin");
        if(this.props.cat.dataState === "NOT_INIT" || this.props.cat.dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                            <BreadcrumbItem active tag="span">Categorical Artwork</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    
                    <Spinner color="primary" />
                </div>
            )
        }
        else
        {
            // const {arts} = this.props.art;
            const {sucMsg} = this.props.cat;
            console.log(this.props);
            if(sucMsg.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Categorical Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">Categorical Artwork</h3>
                        <div className="row justify-content-center pb-5">
                            {sucMsg.map((data,i)=>(
                                <div>
                                    {data.status === "GP" ? 
                                        <div className="card mb-5 art_card bg-transparent border-0" key={i}>
                                            <div data-aos="flip-up" className="art">
                                                <div class="image">
                                                    <img style={{borderRadius:"8px"}} className="card-img-top" alt="Artwork" height="270" width="150" src={`http://localhost:2000/${data.image}`}/>
                                                    <div className="overlay"></div>
                                                    <div className="port_text">
                                                        <span>{data.artist}</span>
                                                        <h3>{data.name}</h3>
                                                        {data.author_id === this.props.auth.user.id || atoken ?
                                                            <div className="link">
                                                                <button type="button" class="btn btn-success btn-sm d-flex m-auto" data-toggle="modal" data-target="#art_modal">
                                                                    Description
                                                                </button>
                                                                <a className="btn btn-sm btn-primary text-center m-1 mt-2" href={`editArt/${data._id}`}>
                                                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                                                </a>
                                                                <button className="btn btn-sm btn-danger text-center m-1 mt-2" onClick={()=>this.Delete(data._id)}>
                                                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                                                </button>
                                                            </div>
                                                        : null }
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-aos="fade-up" class="like text-center">
                                                <a className="text-primary btn font-weight-bold mt-2" onClick={()=>this.Like(data._id)}>
                                                    <i className="fa fa-thumbs-up fa-2x d-inline" aria-hidden="true"></i>
                                                    <p className="p-0 d-inline">{data.likes.length}</p>
                                                </a>
                                                <a className="text-danger btn font-weight-bold mt-2" onClick={()=>this.DisLike(data._id)}>
                                                    <i className="fa fa-thumbs-down fa-2x d-inline" aria-hidden="true"></i>
                                                    <p className="p-0 d-inline">{data.dislikes.length}</p>
                                                </a>
                                            </div>
                                            <div className="modal fade" id="art_modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">{data.name}</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body text-center">
                                                            <p className="pl-4 pr-4">
                                                                <img className="card-img-top" alt="Artwork" height="400" width="auto" src={`http://localhost:2000/${data.image}`}/>
                                                            </p>
                                                            {/* <p>Category : {data.catg.category}</p> */}
                                                            <p>Artist : {data.artist}</p>
                                                            <p>Year : {data.year}</p>
                                                            <p>Description : {data.desc}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    : null }
                                </div> 
                            ))}
                        </div>
                        <div className="text-center pb-5">
                            <div style={{color: "red", fontSize: 13}}>**All additions will be reflected after assessment within a week.<br/> If not the article has been declined.</div>
                        </div>
                    </div>
                )
            }
            else
            {
                return (
                    <div className="container mt-5 text-center">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Categorical Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Artwork found. Please Add.</h2>
                        <div className="text-center pb-5">
                            <div style={{color: "red", fontSize: 13}}>**All additions will be reflected after assessment within a week.<br/> If not the article has been declined.</div>
                        </div>
                    </div>
                )

            }
        }
    }
}

const mapStateToProps=(state)=>({
    art : state.art,
    cat : state.cat,
    auth : state.auth
});

export default connect(mapStateToProps, {onFetchArt, onArtDel, onFetchCat, onFetchCatArt})(withRouter(CatArt));
