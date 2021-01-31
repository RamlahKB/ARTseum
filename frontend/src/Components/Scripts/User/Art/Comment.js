import React, { Component } from 'react';
import {onFetchArt} from './../../../Redux/Art/artAct';
import {onFetchCat} from './../../../Redux/Category/catAct';
import {onAddCom, onFetchCom} from './../../../Redux/Comments/comAct';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';

class Comment extends Component {
    componentDidMount=()=>{
        this.props.onFetchCom();
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    ComSub=(text)=>{
        if (localStorage.getItem("user"))
        {
            if (this.state.usr_com !== "")
            {
                const fd = new FormData();
                fd.append("author_email", this.props.auth.user.email);
                fd.append("author_name", this.props.auth.user.name);
                fd.append("catId", this.props.catId);
                fd.append("artId", this.props.artId);
                fd.append("text", text);
                fd.append("author_img", this.props.auth.user.image);
                fd.append("author_id", this.props.auth.user.id);
                this.props.onAddCom(fd, this.props.history);
            }
        }
        else
        {$("#msgMod").modal('show');}
        $(".input").val("");
        this.props.onFetchCom();
    }
    render() {
        // console.log(this.props);
        return (
            <div>
                <form onSubmit={(e)=>{
                    e.preventDefault();this.ComSub(e.target[0].value);
                }}>
                    <div class="input-group">
                        <input
                            name="usr_com" 
                            onChange={this.Handle}
                            type="text"
                            className="form-control form-control-sm input"
                            placeholder="Type Something..."
                            aria-label="Recipient's username"
                            aria-describedby="button-addon2"
                        />
                        <button
                            className="btn btn-outline-primary m-0 py-0"
                            type="submit"
                            id="button-addon2"
                            data-mdb-ripple-color="dark"
                        >
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                </form>
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
}

const mapStateToProps=(state)=>({
    art : state.art, cat : state.cat, auth : state.auth, comm : state.comm
});

export default connect(
    mapStateToProps, 
    { onFetchArt, onFetchCat, onAddCom, onFetchCom }
)(withRouter(Comment));
