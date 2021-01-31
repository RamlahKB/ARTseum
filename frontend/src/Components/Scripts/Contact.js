import React, { Component } from 'react';
import {onCMail} from './../Redux/Mail/mailAct';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {FormGroup, Input, Button} from 'reactstrap';

class Contact extends Component {
    constructor(props) 
    {
        super(props);
        this.state = { 
            name : "",
            email : "",
            contact : "",
            msg : "",
            sent : false,
            err1 : "",
            err2 : "",
            err3 : "",
            err4 : ""
        };
    }
    Valid=()=>{
        const {name, email, msg} = this.state;
        let emailRE = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
        let err1="", err2="", err3="", err4="";
        if (name === "")
        {
            err1 = "*Please Enter Name";
        }
        if (email === "")
        {
            err2 = "*Please Enter Email";
        }
        if (!email.match(emailRE))
        {
            err3 = "*Please Enter Valid ID"
        }
        if (msg === "")
        {
            err4 = "*Please Enter Message";
        }
        if (err1 || err2 || err3 || err4)
        {
            this.setState({
                err1, err2, err3, err4
            });     
            return false;       
        }
        return true;
    }
    Handle=(e)=>{
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    Submit=()=>{
        console.log(this.state);
        const isValid = this.Valid();
        if(isValid)
        {
            let obj = {
                name : this.state.name,
                email : this.state.email,
                contact : this.state.contact,
                msg : this.state.msg
            }
            this.props.onCMail(obj, this.props.history);
            this.setState({ 
                name : "",
                email : "",
                contact : "",
                msg : ""
            });
        }
        alert("Your mail has been sent");
    }
    render() {
        const {name, email, contact, msg, err1, err2, err3, err4} = this.state;
        return (
            <div className="container mb-5">
                <div className="team pt-0 pb-2" id="team" data-aos="fade-up">
                    <h2>Get in Touch</h2>
                    <p className="lead">We will answer your questions, scope your project and discuss your potential fit in style.</p>
                </div>
                <section className="con_form mb-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-6 col-md-12 p-0" data-aos="fade-right">
                                <iframe title="Our Location" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.2291412052923!2d72.85012421490357!3d19.228842887000386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0d42c95bdf9%3A0x5a3374a957943f4b!2sTryCatch%20classNamees%20%7C%20UI%20UX%2C%20Web%20Design%2C%20IOS%2CAndroid%20Development%2C%20Data%20Science%20Python%20Training%20Course!5e0!3m2!1sen!2sin!4v1607098065793!5m2!1sen!2sin" width="100%" height="100%" frameBorder="0"></iframe>
                            </div>
                            <div className="col-lg-6 col-md-12 p-5" data-aos="fade-left">
                                <div className="h3 ">Quick Message</div>
                                <div className="form">
                                    <form>
                                        <div className="validate">{err1}</div>
                                        <FormGroup/>
                                            <Input type="text" className="form_control" placeholder="Name" name="name" value={name} onChange={this.Handle}/>
                                        <div className="validate">{err2}{err3}</div>
                                        <FormGroup/>
                                            <Input type="email" className="form_control" name="email" placeholder="Email" value={email} onChange={this.Handle}/>
                                        <FormGroup/>
                                            <Input type="number" className="form_control" placeholder="Contact No." name="contact" value={contact} onChange={this.Handle}/>
                                        <div className="validate">{err4}</div>
                                        <FormGroup/>
                                            <Input className="form_control " name="msg" rows="6" type="textarea" placeholder="Message" value={msg} onChange={this.Handle}/>
                                        <FormGroup/>
                                            <Button className="" onClick={this.Submit}>Submit</Button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section><div className="space100"></div>
    {/* <!------------------------ FORM END ----------------------> */}
        <hr/>
    {/* <!------------------------ CONTACT_CARD START ----------------------> */}
                <section className="con_card mt-5">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-4 col-lg-4">
                                <div className="card text-center p-0" data-aos="zoom-in-right">
                                    <div className="card-body c_style">
                                        <p className="h5 card-title">Join the Community</p>
                                        <p className="card-text">Bring to the table win-win survival way to ensure proactive domination.</p>
                                    </div>
                                    <div className="card-footer cf_styl">
                                        <Link>Join the Forum</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <div className="card text-center p-0" data-aos="zoom-in-up">
                                    <div className="card-body c_style">
                                        <p className="h5 card-title">Email Us</p>
                                        <p className="card-text">Bring to the table win-win survival way to ensure proactive domination.</p>
                                    </div>
                                    <div className="card-footer cf_styl">
                                        <Link>support@artseum.com</Link>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-lg-4">
                                <div className="card text-center p-0" data-aos="zoom-in-left">
                                    <div className="card-body c_style">
                                        <p className="h5 card-title">Schedule a Call</p>
                                        <p className="card-text">Bring to the table win-win survival way to ensure proactive domination.</p>
                                    </div>
                                    <div className="card-footer cf_styl">
                                        <Link>+001-45822475</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                <div className="space100"></div>
            </section>
        
    {/* <!------------------------ CONTACT_CARD END ----------------------> */}
        </div>
        )
    }
}

const mapStateToProps=(state)=>({
    mail : state.mail
});

export default connect(mapStateToProps, {onCMail})(withRouter(Contact)); 
