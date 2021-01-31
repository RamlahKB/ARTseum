import React, { Component } from 'react'
import {onFetchCat, onCatDel, onFetchCatArt} from './../../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Spinner, Breadcrumb, BreadcrumbItem} from 'reactstrap';

class Category extends Component {
    constructor(props)
    {
        super();
    }
    componentWillMount(){
        this.getAllCat();
        // this.props.onFetchCat();
    }
    getAllCat=()=>{
        this.props.onFetchCat();
        // this.props.onFetchCatArt();
    }
    Delete=async(id)=>{
        console.log(id);
        const res = await this.props.onCatDel(id);
        if(res)
        {
            this.getAllCat();
        }
    }
    Edit=(id)=>{
        // console.log(id);
        this.props.onCatDel(id, this.props.history);
    }
    CatArt=(id)=>{
        console.log(id);
        const res = this.props.onFetchCatArt(id, this.props.history);
        if (res)
        {
        this.onFetchCatArt();
        }
    }
    render() {
        const atoken = localStorage.getItem("admin");
        console.log(this.props);
        const {dataState} = this.props.cat;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                            <BreadcrumbItem active tag="span">Categories</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Spinner color="primary" />
                </div>
            )
        }
        else 
        {
            const {categ} = this.props.cat;
            if(categ.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                {atoken ? <BreadcrumbItem tag="a" href="/dash">Dash</BreadcrumbItem> : <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>}
                                <BreadcrumbItem active tag="span">Artwork</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">View Category</h3>
                        <div className="row">
                            {categ.map((el,i)=>(
                                <div className="col-md-4" key={i}>
                                    <div data-aos="flip-up" className="card mb-5 art_card" key={i}>
                                        <div className="art">
                                            <div class="image">
                                                <img style={{borderRadius: "8px"}} class="card-img-top" alt="Category" height="270" width="auto" src={`http://localhost:2000/${el.image}`}/>
                                                <div className="overlay"></div>
                                                <div className="port_text">
                                                    <span className="text-decoration-none text-white cursor_pointer" onClick={()=>this.CatArt(el._id)}>
                                                        <h5 class="card-title">{el.category}</h5>
                                                    </span>
                                                    { atoken ?
                                                        <div className="link">
                                                            <Link className="btn btn-primary btn-sm m-1" to={`editCat/${el._id}`}>
                                                                <i className="fa fa-pencil" aria-hidden="true"></i>
                                                            </Link>
                                                            <button className="btn btn-danger btn-sm m-1" onClick={()=>this.Delete(el._id)}>
                                                                <i className="fa fa-trash" aria-hidden="true"></i>
                                                            </button>
                                                        </div>
                                                    : null }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                <BreadcrumbItem active tag="span">Categories</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No categories found. Please Add.</h2>
                    </div>
                )
            }
        }
    }
}

const mapStateToProps=(state)=>({
    cat : state.cat
});

export default connect(mapStateToProps, {onFetchCat, onCatDel, onFetchCatArt})(withRouter(Category)); 