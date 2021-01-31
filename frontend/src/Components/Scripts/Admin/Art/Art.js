import React, { Component } from 'react';
import {onFetchArt, onArtDel, onLike, onDLike} from './../../../Redux/Art/artAct';
// import {onFetchCat} from './../../../Redux/Category/catAct';
import {onLog} from './../../../Redux/Auth/authAct';
import {connect} from 'react-redux';
import {withRouter,} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb} from 'reactstrap';

class Art extends Component {
    constructor(props)
    {
        super(props);
        this.state = {modalId:""};
    }
    componentWillMount=()=>{
        this.getAllArt();        
    }
    getAllArt=()=>{
        this.props.onFetchArt();
    }
    Delete=async(id)=>{
        const res = await this.props.onArtDel(id);
        if(res)
        {
            this.getAllArt();
            // this.props.onFetchArt();
        }
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
    render() {
        console.log(this.props.art);
        const atoken = localStorage.getItem("admin");
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
                    <div className="text-center fixed-bottom">
                        <h4 className="text-info">All additions will be reflected after assessment within a week.<br/> If not the article has been declined.</h4>
                    </div>
                </div>
            )
        }
        else
        {
            const {arts} = this.props.art;
            // const {categ} = this.props.cat;
            console.log("Arts");
            console.log(arts);
            const {modalId} = this.state;
            if(arts.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">Artwork</h3>
                        <div className="row justify-content-center pb-5">
                            {arts.map((data,i)=>(
                                
                                <div>
                                    {/* <div>{console.log(data.catg)}
                                        </div> */}
                                    {data.status === "GP" ? 
                                        <div className="card mb-5 art_card bg-transparent border-0" key={i}>
                                            <div data-aos="flip-up" className="art">
                                                <div class="image">
                                                    <img style={{borderRadius:"8px"}} className="card-img-top" alt="Artwork" height="270" width="150" src={`http://localhost:2000/${data.image}`}/>
                                                    <div className="overlay"></div>
                                                    <div className="port_text">
                                                        <span>{data.artist}</span>
                                                        <h3>{data.name}</h3>
                                                        <h3>{data.catg.category}</h3>
                                                        {data.author_id === this.props.auth.user.id || atoken ?
                                                            <div className="link">
                                                                <button type="button" class="btn btn-success btn-sm d-flex m-auto" data-toggle="modal" data-target={`#${this.state.modalId}`} onClick={() => this.setState({modalId:`modal${i}`})}>
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
                                            {/* {this.state.modalId} */}
                                            <div className="modal fade" id={this.state.modalId} tabindex="-1" role="dialog" aria-hidden="true">
                                                <div className="modal-dialog modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header justify-content-center text-white text-center bg-success">
                                                            <h5 className="modal-title" id="exampleModalLongTitle">{data.name}</h5>
                                                        </div>
                                                        <div class="modal-body text-center">
                                                            <p className="pl-4 pr-4">
                                                                <img className="card-img-top" alt="Artwork" height="400" width="auto" src={`http://localhost:2000/${data.image}`}/>
                                                            </p>
                                                            <div className="p-4">
                                                                <table class="table border table-borderless table-hover table-sm mb-0"> 
                                                                    <tbody>
                                                                        <tr>
                                                                            <th className="text-sm">Category</th>
                                                                            {/* <td className="text-sm">{data.catg.category}</td> */}
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="text-sm">Artist</th>
                                                                            <td className="text-sm">{data.artist}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="text-sm">Year</th>
                                                                            <td className="text-sm">{data.year}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <th className="text-sm">Description</th>
                                                                            <td className="text-sm">{data.desc}</td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>                                                            
                                                            <button type="button" class="btn btn-success" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    : null }
                                </div> 
                            ))}
                        </div>
                        {atoken ? null :
                            <div className="text-center pb-5">
                                <div style={{color: "red", fontSize: 13}}>**All additions will be reflected after assessment within a week.<br/> If not the article has been declined.</div>
                            </div>
                        }
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
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Artwork found. Please Add.</h2>
                        {atoken ? null :
                            <div style={{marginBottom: 500}}>
                                <div className="text-center">
                                    <div style={{color: "red", fontSize: 13}}>**All additions will be reflected after assessment within a week.<br/> If not, the article has been declined.</div>
                                </div>
                            </div>
                        }
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

export default connect(
    mapStateToProps, 
    {
        onFetchArt, 
        onArtDel, 
        onLog, 
        onLike, 
        onDLike
    }
)(withRouter(Art));
