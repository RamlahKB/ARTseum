import React, { Component } from 'react'
import {onFetchCat, onCatDel} from '../../Redux/Category/catAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {Spinner, Breadcrumb, BreadcrumbItem} from 'reactstrap';

class Category extends Component {
    constructor(props)
    {
        super();
        this.state = {id:""};
    }
    componentWillMount(){
        this.getAllCat();
        // this.props.onFetchCat();
    }
    getAllCat=()=>{
        this.props.onFetchCat();
        // this.props.onFetchCatArt();
    }
    render() {
        // const atoken = localStorage.getItem("admin");
        console.log(this.props);
        const {categ, dataState} = this.props.cat;
        if(dataState === "NOT_INIT" || dataState === "FETCHING")
        {
            return (
                <div className="container mt-5 text-center">
                    <div className="row justify-content-center mb-4">
                        <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                            <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                            <BreadcrumbItem active tag="span">Categories</BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <Spinner color="primary" />
                </div>
            )
        }
        else 
        {
            if(categ.length > 0)
            {
                return (
                    <div className="container mt-5">
                        <div className="row justify-content-center mb-4">
                            <Breadcrumb tag="nav" listTag="div" className="col-md-12"> 
                                <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Categories</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h3 className="text-center text-info mb-5">View Category</h3>
                        <div className="row justify-content-center pb-5">
                            {categ.map((el,i)=>(
                                
                                        <div className="card mb-5 art_card bg-transparent border-0" key={i}>
                                            <div data-aos="flip-up" className="art">
                                                <div className="image">
                                                    <img style={{borderRadius: "8px"}} className="card-img-top" alt="Category" height="270" width="auto" src={`http://localhost:2000/${el.image}`}/>
                                                    <div className="overlay"></div>
                                                    <div className="port_text">
                                                        <span className="cursor_pointer">
                                                            <Link className="text-decoration-none text-white" to={`catArt/${el._id}/${el.category}`}>
                                                                <h5 className="card-title">{el.category}</h5>
                                                            </Link>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div> 
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
                                <BreadcrumbItem tag="a" href="/">Home</BreadcrumbItem>
                                <BreadcrumbItem active tag="span">Categories</BreadcrumbItem>
                            </Breadcrumb>
                        </div>
                        <h2 className="text-info">No categories found. Please Add.</h2>
                        <div className="text-center pb-5" style={{marginBottom: 350}}>
                            <div style={{color: "red", fontSize: 13}}>**All additions will be reflected after assessment within a week.<br/> If not the article has been declined.</div>
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

export default connect(mapStateToProps, {onFetchCat, onCatDel})(withRouter(Category)); 