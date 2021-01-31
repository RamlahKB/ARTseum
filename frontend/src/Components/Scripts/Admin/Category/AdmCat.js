import React, { Component } from 'react';
import {onFetchCat, onCatDel} from '../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb, Button} from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';

class AdmCat extends Component {
    constructor(props)
    {
        super(props);
        this.state = {id: ""};
    }
    componentDidMount=()=>{
        this.getAllCat();
        
    }
    getAllCat=()=>{
        this.props.onFetchCat();
    }
    Delete=async(id)=>{
        const res = await this.props.onCatDel(id);
        if(res)
        {
            this.getAllCat();
        }
    }
    render() {
        const {categ, dataState} = this.props.cat;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Category</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Spinner color="primary" />
                </div>
            )
        }
        else
        {
            const data = {
                columns : [
                    { label: 'Sr. No.', field: 'index' },
                    { label: 'Image', field: 'image' },
                    { label: 'Name', field: 'category' },
                    { label: 'Date', field: 'date' },
                    { label: 'Action', field : 'action' },
                ],
                rows: categ.map((data,i) => {
                    data.date = (new Date(data.date)).toLocaleString();
                    return {
                            index : i+1,
                            image : <img style={{borderRadius:"8px",width:"150px"}} className="card-img-top" alt="Artwork" height="auto" src={`http://localhost:2000/${data.image}`}/>,
                            category: data.category,
                            date: data.date,
                            action : <div className="text-center">
                                        <a className="btn btn-primary text-center m-1 mt-2" href={`editCat/${data._id}`}>
                                            <i className="fas fa-edit" aria-hidden="true"></i>
                                        </a>
                                        <button className="btn btn-danger text-center m-1 mt-2" data-toggle="modal" data-target="#delete" onClick={()=>this.setState({id : data._id})}>
                                            <i className="fas fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                        }
                })
            };
            if(categ.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Category</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <div className="row justify-content-center">
                            <h3 className="col-9 text-center text-info mb-5 pl-5 d-inline">
                                <span className="ml-5 pl-5">Categories</span>
                            </h3>
                            <div className="col-2 d-inline">
                                <Button tag={Link} to="/addCat">
                                    <i className="fas fa-plus mr-2"></i>
                                    Category
                                </Button>
                            </div>
                        </div>
                        <div className="row justify-content-center pb-5">
                            <div className="bg-white data_table">
                                <div className="p-2">
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
                                <BreadcrumbItem active tag="span">Category</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Categories found.</h2>
                        <div className="text-center">
                            <Button tag={Link} to="/addCat">
                                <i className="fas fa-plus mr-2"></i>
                                Category
                            </Button>
                        </div>
                    </div>
                )
            }
        }
    }
}


const mapStateToProps=(state)=>({
    cat : state.cat
});

export default connect(
    mapStateToProps, 
    {
        onFetchCat, 
        onCatDel
    }
)(withRouter(AdmCat)); 
