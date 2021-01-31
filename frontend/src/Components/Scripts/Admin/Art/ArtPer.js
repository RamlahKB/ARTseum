import React, { Component } from 'react';
import {onFetchArt, onArtDel, onUpStatus} from './../../../Redux/Art/artAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb} from 'reactstrap';

class ArtPer extends Component {
    constructor(props)
    {
        super(props);
        const id = this.props.match.params.id;
        this.Permit(id);
    }
    componentWillMount=()=>{
        // this.getAllArt();
        this.props.onFetchArt();
    }
    Like=async(id)=>{
        console.log(id);
        if(localStorage.getItem("admin") || localStorage.getItem("user"))
        {
            const res = await this.props.onLike(id);
            if(res)
            {
                this.getAllArt();
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
                this.getAllArt();
            }
        }
        else
        {alert("Please Login");}
    }
    Permit=async(id)=>{
        const res = await this.props.onUpStatus(id);
        if(res)
        {
            // this.getAllArt();
            this.props.onFetchArt();
        }
    }
    Delete=async(id)=>{
        const res = await this.props.onArtDel(id);
        if(res)
        {
            // this.getAllArt();
            this.props.onFetchArt();
        }
    }
    render() {
        const atoken = localStorage.getItem("admin");        
        // console.log(this.props);
        if(this.props.art.dataState === "NOT_INIT" || this.props.art.dataState === "FETCHING")
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
            const {arts} = this.props.art;
            // const {categ} = this.props.cat;
            console.log(this.props);
            if(arts.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/dash">Dashboard</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Login</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">Artwork Permisions</h3>
                        <div className="row justify-content-center">
                            {arts.map((data,i)=>(
                                <div>
                                    {data.status === "NP" ? 
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
                                                                <button className="btn btn-sm btn-primary text-center m-1 mt-2" onClick={()=>this.Permit(data._id)}>
                                                                    <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                                                                </button>
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
                                    : null  }
                                </div> 
                            ))}
                        </div>
                    </div>
                )
            }
            else
            {
                return (
                    <div className="container mt-5 text-center ">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/dash">Dashboard</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Login</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Artwork found.</h2>
                    </div>
                )

            }
        }
    }
}

const mapStateToProps=(state)=>({
    art : state.art,
    cat : state.cat
});

export default connect(mapStateToProps, {onFetchArt, onArtDel, onUpStatus})(withRouter(ArtPer));
