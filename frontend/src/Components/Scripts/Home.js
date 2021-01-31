import React, { Component } from 'react';
import About from './About';
import Contact from './Contact';
import './../Scripts/style.css';
import BackgroundSlider from 'react-background-slider';
import image1 from './../../Assets/images/bg5.jpg';
import image2 from './../../Assets/images/bg6.jpg';
import image3 from './../../Assets/images/bg4.jpg';
import image4 from './../../Assets/images/bg7.jpg';
import image5 from './../../Assets/images/bg8.jpg';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {onUserDel} from './../Redux/Auth/authAct';
import $ from 'jquery';

class Home extends Component {
    componentDidMount=()=>{
        if (this.props.auth.sMsg !== null)
        {
            $("#accDel").modal('show');
        }
    }
    render() {
        // console.log(this.props.auth);
        return (
            <div className="mt-0">
                <div className="home" id="home">
                    <BackgroundSlider
                        images={[image1, image2, image3, image4, image5]}
                        duration={3}
                        transition={2}
                    /> 
                    <div className="overlay"></div>
                    <div className="home_text"data-aos="fade-up">
                        <h1>we are creative agency</h1>
                        <p>Morbi mattis felis at nunc. Duis viverra diam non justo. In nisl. Nullam sit amet magna in magna gravida vehicula. Mauris tincidunt sem sed arcu. Nunc posuere.</p>
                        <div className="home_btn">
                            <Link data-aos="flip-up" className="btn1 btns" to="/art">Get started</Link>
                            <Link data-aos="flip-up" className="btn2 btns" to="/cat">Learn More</Link>
                        </div>
				    </div>
		        </div>
                <About/>
                <Contact/>
                <div className="modal fade" id="accDel">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header bg-warning justify-content-center text-center">
                                <h5 className="modal-title text-white font-weight-bold" id="exampleModalLabel">DELETE</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center p-4">
                                {this.props.auth.sMsg}
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
    auth : state.auth
});

export default connect(mapStateToProps, {onUserDel})(withRouter(Home));
