import React, { Component } from 'react';
import {onFetchArt, onArtDel, onLike, onDLike} from './../../../Redux/Art/artAct';
import {connect} from 'react-redux';
import {withRouter,} from 'react-router-dom';
import {Spinner, BreadcrumbItem, Breadcrumb} from 'reactstrap';
import $ from 'jquery'; 
import {DataTable} from 'datatables.net-dt';

class Art extends Component {
    constructor(props)
    {
        super(props);
        this.state = {modalId:""};
    }
    componentDidMount=()=>{
        this.getAllArt();    
        $(document).ready(function() {
            $('#example').DataTable();
        } );  
        
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
            // const {modalId} = this.state;
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
                        <div className="row justify-content-center pb-5 bg-white">
                            {/* {arts.map((data,i)=>(
                                
                            ))} */}
                            <table id="example" class="table table-hover table-bordered">
                                <thead>
                                    <tr>
                                    <th>Name</th>
                                    <th>Artist</th>
                                    <th>Year</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {arts.map((data)=>{
                                    return (
                                    
                                        <tr>
                                        <td>{data.name}</td>
                                        <td>{data.artist}</td>
                                        <td>{data.year}</td>
                                        </tr>
                                    
                                    )
                                })}
                                
                                    
                                </tbody>
                            </table>

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
                    </div>
                )
            }
        }
    }
}

const mapStateToProps=(state)=>({
    art : state.art,
    cat : state.cat,
});

export default connect(
    mapStateToProps, 
    {
        onFetchArt, 
        onArtDel,
        onLike, 
        onDLike
    }
)(withRouter(Art));
