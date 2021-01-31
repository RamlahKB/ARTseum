import React, { Component } from 'react'
import './../Scripts/style.css';
import logo from "./../../logo1.png";
import {withRouter} from 'react-router-dom';

class Footer extends Component {
    render() {
		const atoken = localStorage.getItem("admin");
		// console.log(this.props.match.path);
		const {pathname} = this.props.history.location;
		if (pathname === "/adminLog" || pathname === "/adminReg" || pathname.includes("/newPass/") || atoken)
		{return null;}
        else
        {
			return (
				<div>
					{/* <!----------------------------------- FOOTER END ------------------------------------->  */}
						<div className="footer">
							<div className="row">
								<a className="logo" href="/">
									<img src={logo} alt="logo" className="clogo"/>
								</a>
								<ul className="social mt-5">
									<li>
										<a href="https://www.facebook.com/"><i className="fab fa-2x my-2 fa-facebook-f"></i></a>
									</li>
									<li>
										<a href="https://twitter.com/?lang=en"><i className="fab fa-2x my-2 fa-twitter"></i></a>
									</li>
									<li>
										<a href="https://accounts.google.com/login/signinchooser?flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i className="fab fa-2x my-2 fa-google-plus-g"></i></a>
									</li>
									<li>
										<a href="https://www.instagram.com/?hl=en"><i className="fab fa-2x my-2 fa-instagram"></i></a>
									</li>
									<li>
										<a href="https://in.linkedin.com/"><i className="fab fa-2x my-2 fa-linkedin-in"></i></a>
									</li>
									<li>
										<a href="https://www.youtube.com/"><i className="fab fa-2x my-2 fa-youtube"></i></a>
									</li>
								</ul>
								<div className="f_copy">
									<p>© Built with pride and caffeine 2020. All Rights Reserved. Designed by <a href="/" target="_blank">Ramlah</a></p>
								</div>
							</div>
						</div>
	{/* <!----------------------------------- FOOTER END -------------------------------------></div> */}
				</div>
			)
		}
    }
}

export default (withRouter(Footer));
