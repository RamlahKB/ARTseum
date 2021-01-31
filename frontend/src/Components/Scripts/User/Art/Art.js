import React, { Component } from 'react';
import {onFetchArt, onArtDel, onLike, onDLike, onModal} from './../../../Redux/Art/artAct';
import {onFetchCat} from './../../../Redux/Category/catAct';
import {onFetchCom, onComDel} from './../../../Redux/Comments/comAct';
import Comment from './Comment';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb} from 'reactstrap';
import $ from 'jquery';


class Art extends Component {
    constructor(props)
    {
        super(props);
        this.state = {id : "", name : "", catg : "", artist : "", year : "", desc : "", image : "", comId:""};
    }
    componentDidMount=()=>{
        this.props.onFetchCat();
        this.props.onFetchArt();
        this.props.onFetchCom();  
    }
    Delete=async(id)=>{
        const res = await this.props.onArtDel(id);
        if(res)
        { this.getAllArt(); }
    }
    ComDel=async(id)=>{
        // this.setState({comId:id});
        // console.log(this.state.comId);
        const res = await this.props.onComDel(id);
        if(res)
        { this.props.onFetchCom(); }
    }
    Modal=async(id)=>{
        const res = await this.props.onModal(id);
        this.setState({
            id : res._id, name : res.name, catg : res.catg, artist : res.artist, year : res.year, desc : res.desc, image : res.image
        });
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    Like=async(id)=>{
        // console.log(id);
        if(localStorage.getItem("user"))
        {
            const res = await this.props.onLike(id);
            if(res)
            {
                this.getAllArt();
            }
        }
        else
        {$("#msgMod").modal('show');}
    }
    DisLike=async(id)=>{
        // console.log(id);
        if(localStorage.getItem("user"))
        {
            const res = await this.props.onDLike(id);
            if(res)
            {
                this.getAllArt();
            }
        }
        else
        {$("#msgMod").modal('show');}
    }
    render() {
        console.log(this.props);
        const {arts, dataState} = this.props.art;
        const {name,artist,year,desc,image,catg} = this.state;
        const {categ} = this.props.cat;
        const {comms, err} = this.props.comm;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Spinner color="primary" />
                    <div style={{marginBottom: 350}}>
                            <div className="text-center">
                                <div style={{color: "red", fontSize: 13}}>**All additions will be approved after assessment within a week<br/> after which no editions will be considered.</div>
                            </div>
                        </div>
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
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">Artwork</h3>
                        <div className="row justify-content-center pb-5 mb-5">
                            {arts.map((data,i)=>(
                                
                                <div>
                                    {/* {data.status === "GP" ?  */}
                                        <div className="card art_card bg-light border-0 mb-3" key={i}>
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
                                            <div className="like m-3">
                                                <a className="text-primary font-weight-bold mt-2 mr-1 border-0" onClick={()=>this.Like(data._id)}>
                                                    <i className="fa fa-thumbs-up d-inline" aria-hidden="true"></i>
                                                    <p className="p-0 ml-1 d-inline">{data.likes.length}</p>
                                                </a>
                                                <a className="text-danger btnt-weight-bold mt-2 ml-1 border-0" onClick={()=>this.DisLike(data._id)}>
                                                    <i className="fa fa-thumbs-down d-inline" aria-hidden="true"></i>
                                                    <p className="p-0 ml-1 d-inline">{data.dislikes.length}</p>
                                                </a>
                                                <div>
                                                <span className="h6 cursor_pointer text-primary" data-toggle="collapse" data-target={`#comCol${data._id}`}>
                                                        <small className="mb-2">
                                                            Comments
                                                            <span class="badge bg-primary ml-2">{comms.filter((val)=>{
                                                                if(val.artId._id === data._id)
                                                                {return val}
                                                            }).length}</span>
                                                        </small>
                                                    </span>
                                                    <div className="collapse" id={`comCol${data._id}`}>
                                                            {/* {comms.length === null ?
                                                                <small className="text-muted">Be the first to commment</small>
                                                                :
                                                                <div> */}
                                                                    {comms.map((c,i)=>(
                                                                        <div>
                                                                            {data._id === c.artId._id ?
                                                                                <div key={i} className="media">
                                                                                    {c.author_img ? 
                                                                                        <img alt="User" className="rounded-circle mr-2" height="25px" src={`http://localhost:2000/${c.author_img}`}/>
                                                                                    :
                                                                                        <i className="far fa-user mr-2 rounded-circle"></i>
                                                                                    }
                                                                                    <div className="media-body">
                                                                                        <small className="mt-0 text-muted">{c.author_name}</small><br/>
                                                                                        <small>{c.text}</small>
                                                                                        {c.author_id === this.props.auth.user.id ?
                                                                                            <span className="float-right cursor_pointer" onClick={()=>this.ComDel(c._id)}>
                                                                                                <i class="text-danger fas fa-trash"></i>
                                                                                            </span>
                                                                                        : null }
                                                                                    </div>
                                                                                </div>
                                                                            : null }
                                                                        </div>
                                                                    ))}
                                                                {/* </div>
                                                            } */}
                                                            {err ? <small className="text-danger">{err}</small> : null }
                                                            <Comment artId={data._id} catId={data.catg._id} />
                                                        </div>
                                                </div>
                                            </div>
                                            <div className="modal fade" id="art_modal" tabindex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header justify-content-center text-white text-center bg-success">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">{name}</h5>
                                                        </div>
                                                        <div className="modal-body">
                                                            <p className="pl-4 pr-4">
                                                                <img className="card-img-top" alt="Artwork" height="400" width="auto" src={`http://localhost:2000/${image}`}/>
                                                            </p>
                                                            <div className="p-4">
                                                                <table className="table border table-borderless table-hover table-sm mb-0"> 
                                                                    <tbody>
                                                                        <tr>
                                                                            <th className="text-sm">Category</th>
                                                                            <td className="text-sm">
                                                                            <select disabled className="form-control form-control-sm " value={catg}>
                                                                                {categ.map((el,i)=>(
                                                                                    <option key={i} value={el._id} >
                                                                                        {el.category}
                                                                                    </option>
                                                                                ))}
                                                                            </select>
                                                                            </td>
                                                                        </tr>
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
                                                <div className="modal-dialog" role="document">
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
                                    {/* : null } */}
                                </div> 
                            ))}
                        </div>
                        <div className="text-center pb-5">
                            <div style={{color: "red", fontSize: 13}}>**All additions will be approved after assessment within a week<br/> after which no editions will be considered.</div>
                        </div>
                        <div className="modal fade" id="msgMod">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header bg-warning justify-content-center text-center">
                                        <h5 className="modal-title text-white font-weight-bold" id="exampleModalLabel">DELETE</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body text-center p-4">
                                        Please Login to access this functionality
                                    </div>
                                    <div className="modal-footer justify-content-center text-center">
                                        <button type="button" className="btn btn-warning" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
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
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Artwork found. Please Add.</h2>
                        <div style={{marginBottom: 350}}>
                            <div className="text-center">
                                <div style={{color: "red", fontSize: 13}}>**All additions will be approved after assessment within a week<br/> after which no editions will be considered.</div>
                            </div>
                        </div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps=(state)=>({
    art : state.art, cat : state.cat, auth : state.auth, comm : state.comm
});

export default connect(
    mapStateToProps, 
    { onFetchArt, onFetchCat, onArtDel, onLike, onDLike, onModal, onFetchCom, onComDel }
)(withRouter(Art));
