import React, { Component } from 'react';
import {onFetchArt, onArtDel, onUpStatus} from './../../Redux/Art/artAct';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb, Button} from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';

class AdmArt extends Component {
    constructor(props)
    {
        super(props);
        this.state = {id: ""};
    }
    componentDidMount=()=>{
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
    Permit=async(id)=>{
        const res = await this.props.onUpStatus(id);
        if(res)
        {
            this.getAllArt();
            // this.props.onFetchArt();
        }
    }
    render() {
        // console.log(this.props.art);
        const {arts, dataState} = this.props.art;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
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
            const data = {
                columns : [
                    { label: 'Sr. No.', field: 'index' },
                    { label: 'Image', field: 'image' },
                    { label: 'Name', field: 'name' },
                    { label: 'Artist', field: 'artist' },
                    { label: 'Year', field: 'year' },
                    { label: 'Description', field: 'desc' },
                    { label: 'Category', field: 'catg' },
                    { label: 'Status', field: 'status' },
                    { label: <i className="fa fa-thumbs-up fa-2x d-inline text-primary" aria-hidden="true"></i>, field: 'likes' },
                    { label: <i className="fa fa-thumbs-down fa-2x d-inline text-danger" aria-hidden="true"></i>, field: 'dislikes' },
                    { label: 'Created', field: 'date' },
                    { label: 'Action', field : 'action' },
                ],
                rows: arts.map((data,i) => {
                    data.date = (new Date(data.date)).toLocaleString();
                    return {
                            index : i+1,
                            image : <img style={{borderRadius:"8px",width:"150px"}} className="card-img-top" alt="Artwork" height="auto" src={`http://localhost:2000/${data.image}`}/>,
                            name: data.name,
                            artist: data.artist,
                            year: data.year,
                            desc : data.desc,
                            catg: data.catg.category,
                            status:data.status,
                            likes: data.likes.length,
                            dislikes: data.dislikes.length,
                            date : data.date,
                            action : <div className="text-center">
                                        <a className="btn btn-primary text-center m-1 mt-2" href={`editArt/${data._id}`}>
                                            <i className="fas fa-edit" aria-hidden="true"></i>
                                        </a>
                                        <button className="btn btn-danger text-center m-1 mt-2" data-toggle="modal" data-target="#delete" onClick={()=>this.setState({id : data._id})}>
                                            <i className="fas fa-trash" aria-hidden="true"></i>
                                        </button>
                                        {data.status === "Pending" ?
                                            <div>
                                                <button className="btn btn-success text-center m-1 mt-2" data-toggle="modal" data-target="#per" onClick={()=>this.setState({id : data._id})}>
                                                    <i className="far fa-check-circle"></i>
                                                </button>
                                            </div>
                                        : null }
                                    </div>
                        }
                })
            };
            if(arts.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className="row justify-content-center">
                            <h3 className="col-10 text-center text-info mb-5 pl-5 d-inline">
                                <span className="ml-5 pl-5">Artwork</span>
                            </h3>
                            <div className="col-2 d-inline">
                            <Button tag={Link} to="/addArt">
                                <i className="fas fa-plus mr-2"></i>
                                Art
                            </Button>
                            </div>
                        </div>
                        <div className="row justify-content-center pb-2">
                            <div className="bg-white data_table">
                                <div className="col-md-11 container p-2 m-1">
                                    <MDBDataTableV5
                                        hover
                                        data={data}
                                        entriesOptions={[3, 6, 9, 12]} 
                                        entries={3} 
                                        pagesAmount={4}
                                        pagingTop
                                        searchTop
                                        searchBottom={false}
                                    />;
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
                        <div className="modal fade" id="per" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered" role="document">
                                <div className="modal-content">
                                    <div className="modal-header bg-success justify-content-center text-center">
                                        <h5 className="modal-title text-white font-weight-bold" id="exampleModalLabel">ADD</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body text-center p-4">
                                        Add to Site ?
                                    </div>
                                    <div className="modal-footer justify-content-center text-center">
                                        <button type="button" className="btn btn-info" data-dismiss="modal">Close</button>
                                        <button type="button" className="btn btn-success" data-dismiss="modal" onClick={()=>this.Permit(this.state.id)}>Add</button>
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
                                <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Artwork found.</h2>
                        <div className="text-center">
                            <Button tag={Link} to="/addArt">
                                <i className="fas fa-plus mr-2"></i>
                                Art
                            </Button>
                        </div>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps=(state)=>({
    art : state.art,
});

export default connect(
    mapStateToProps, 
    {
        onFetchArt, 
        onArtDel,
        onUpStatus
    }
)(withRouter(AdmArt));
