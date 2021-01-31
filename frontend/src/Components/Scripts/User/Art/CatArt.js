import React, { Component } from 'react';
import {onFetchArt, onArtDel, onModal} from './../../../Redux/Art/artAct';
// import {onFetchCat, onFetchCatArt} from './../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spinner, Breadcrumb, BreadcrumbItem} from 'reactstrap';

class CatArt extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {cat_id:"", id : "", name : "", artist : "", year : "", desc : "", image : ""};
    }
    componentDidMount=()=>{
        // this.getAllArt();
        this.props.onFetchArt();
        // this.props.onFetchCat();
        // this.props.onFetchCatArt();
    }
    Like=async(id)=>{
        console.log(id);
        if(localStorage.getItem("user"))
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
        if(localStorage.getItem("user"))
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
    // Edit=(id)=>{
    //     console.log(id);
    //     this.props.onArtDel(id, this.props.history);
    // }
    Modal=async(id)=>{
        const res = await this.props.onModal(id);
        console.log();
        this.setState({
            id : res._id,
            name : res.name,
            artist : res.artist,
            year : res.year,
            desc : res.desc,
            image : res.image,
        });
    }
    render() {
        console.log(this.props);
        const cat_id = this.props.match.params.id;
        const {arts, dataState} = this.props.art;
        const {name,artist,year,desc,image} = this.state;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem tag="a" href="/cat">Categories</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">{this.props.match.params.name}</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    
                    <Spinner color="primary" />
                </div>
            )
        }
        else
        {
            if(arts.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                                <BreadcrumbItem tag="a" href="/cat">Categories</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">{this.props.match.params.name}</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">{this.props.match.params.name}</h3>
                        <div className="row justify-content-center pb-5">
                            {arts.map((data,i)=>(
                                <div>
                                    {data.catg._id === cat_id ? 
                                        <div className="card mb-5 art_card bg-transparent border-0" key={i}>
                                            <div data-aos="flip-up" className="art">
                                                <div class="image">
                                                    <img style={{borderRadius:"8px"}} className="card-img-top" alt="Artwork" height="270" width="150" src={`http://localhost:2000/${data.image}`}/>
                                                    <div className="overlay"></div>
                                                    <div className="port_text">
                                                        <span>{data.artist}</span>
                                                        <h3>{data.name}</h3>
                                                        <div className="link">
                                                            <button className="btn btn-success btn-sm d-flex m-auto" data-toggle="modal" data-target="#art_modal" onClick={()=>this.Modal(data._id)}>
                                                                Description
                                                            </button>
                                                            {data.author_id === this.props.auth.user.id ?
                                                                <div>
                                                                    {data.status === "Pending" ?
                                                                        <div>
                                                                            <a className="btn btn-primary text-center m-1 mt-2" href={`editArt/${data._id}`}>
                                                                                <i className="fas fa-edit" aria-hidden="true"></i>
                                                                            </a>
                                                                            <button className="btn btn-danger text-center m-1 mt-2" data-toggle="modal" data-target="#delete" onClick={()=>this.setState({id : data._id})}>
                                                                                <i className="fas fa-trash" aria-hidden="true"></i>
                                                                            </button>
                                                                        </div>
                                                                    : null }
                                                                </div>
                                                            : null }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div data-aos="fade-up" className="like text-center">
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
                                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header justify-content-center text-white text-center bg-success">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">{name}</h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                                <span className="text-white" aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <p className="pl-4 pr-4">
                                                                <img className="card-img-top" alt="Artwork" height="400" width="auto" src={`http://localhost:2000/${image}`}/>
                                                            </p>
                                                            <div className="p-4">
                                                                <table className="table border table-borderless table-hover table-sm mb-0"> 
                                                                    <tbody>
                                                                        <tr>
                                                                            <th className="text-sm">Artist</th>
                                                                            <td className="text-sm">{artist}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="text-sm">Year</th>
                                                                            <td className="text-sm">{year}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="text-sm">Description</th>
                                                                            <td className="text-sm">{desc}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div> 
                                                            <div className="modal-footer justify-content-center text-center">                                                           
                                                                <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="modal fade" id="delete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header bg-danger justify-content-center text-center">
                                                            <h5 className="modal-title text-white font-weight-bold" id="exampleModalLabel">DELETE</h5>
                                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div className="modal-body text-center p-4">
                                                            Delete Post ?
                                                        </div>
                                                        <div className="modal-footer justify-content-center text-center">
                                                            <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>this.Delete(this.state.id)}>Delete</button>
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
                            <div style={{color: "red", fontSize: 13}}>**All additions will be approved after assessment within a week.<br/> after which no editions will be considered.</div>
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
                                <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                                <BreadcrumbItem tag="a" href="/cat">Categories</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">{this.props.match.params.name}</BreadcrumbItem>
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
    auth : state.auth
});

export default connect(mapStateToProps, {onFetchArt, onArtDel,onModal})(withRouter(CatArt));
