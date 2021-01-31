import React, { Component } from 'react';
import {onFetchCom, onComDel} from './../../Redux/Comments/comAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb} from 'reactstrap';
import { MDBDataTableV5 } from 'mdbreact';

class AdmCom extends Component {
    constructor(props)
    {
        super(props);
        this.state = {id: ""};
    }
    componentDidMount=()=>{
        this.props.onFetchCom();
    }
    Delete=async(id)=>{
        const res = await this.props.onComDel(id);
        if(res)
        {
            this.props.onFetchCom();
        }
    }
    render() {
        console.log(this.props);
        const {comms, dataState} = this.props.comm;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Comments</BreadcrumbItem>
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
                    { label: 'Artwork', field: 'art' },
                    { label: 'User', field: 'user' },
                    { label: 'Comment', field: 'com' },
                    { label: 'Date', field: 'date' },
                    { label: 'Action', field : 'action' },
                ],
                rows: comms.map((data,i) => {
                    data.date = (new Date(data.date)).toLocaleString();
                    return {
                            index : i+1,
                            art : <img style={{borderRadius:"8px",width:"150px"}} className="card-img-top" alt="Artwork" height="auto" src={`http://localhost:2000/${data.artId.image}`}/>,
                            user: data.author_id,
                            com : data.text,
                            date: data.date,
                            action : <div className="text-center">
                                        <button className="btn btn-danger text-center m-1 mt-2" data-toggle="modal" data-target="#delete" onClick={()=>this.setState({id : data._id})}>
                                            <i className="fas fa-trash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                        }
                })
            };
            if(comms.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Comments</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5 pl-5">
                                <span>Comments</span>
                        </h3>
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
                                <BreadcrumbItem active tag="span">Comments</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No Comments found.</h2>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps=(state)=>({
    comm : state.comm
});

export default connect(
    mapStateToProps, 
    {
        onFetchCom, 
        onComDel
    }
)(withRouter(AdmCom));
