import React, { Component } from 'react'
import team1 from './../../Assets/images/team1.jpg';
import team2 from './../../Assets/images/team2.jpg';
import team3 from './../../Assets/images/team3.jpg';
import './../Scripts/style.css';

export default class About extends Component {
    render() {
        return (
            <div className="container mt-5 mb-5">
		{/* <!----------------------------------- TEAM START -------------------------------------> */}
		<div className="team" id="team">
			<div data-aos="fade-up">
				<h2>Our Team</h2>
				<p className="lead">Use our staff and our expertise to design and plan your artistic growth strategy. Artseum is a team eager to advise you on the best opportunities that you should look into</p>
			</div>
			<div className="row text-center">
				<div className="member col-md-4 col-sm-12 m-auto" data-aos="zoom-in-right">
					<div className="mem_in">
					<div className="image">
						<img src={team1} alt="team member"/>
						<div className="overlay">
							<div className="social">
								<a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
								<a href="https://accounts.google.com/login/signinchooser?flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i className="fab fa-google-plus-g"></i></a>
								<a href="https://twitter.com/?lang=en"><i className="fab fa-twitter"></i></a>
							</div>
						</div>
					</div>
					<div className="mem_text">
						<h3>John Doe</h3>
						<span>Web Designer</span>
					</div>
					</div>
				</div>
				<div className="member col-md-4 col-sm-12 m-auto" data-aos="zoom-in-up">
					<div className="mem_in">
					<div className="image">
						<img src={team2} alt="team member"/>
						<div className="overlay">
							<div className="social">
								<a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
								<a href="https://accounts.google.com/login/signinchooser?flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i className="fab fa-google-plus-g"></i></a>
								<a href="https://twitter.com/?lang=en"><i className="fab fa-twitter"></i></a>
							</div>
						</div>
					</div>
					<div className="mem_text">
						<h3>John Doe</h3>
						<span>UI/UX Designer</span>
					</div>
					</div>
				</div>
				<div className="member col-md-4 col-sm-12 m-auto" data-aos="zoom-in-left">
					<div className="mem_in">
					<div className="image">
						<img src={team3} alt="team member"/>
						<div className="overlay">
							<div className="social">
								<a href="https://www.facebook.com/"><i className="fab fa-facebook-f"></i></a>
								<a href="https://accounts.google.com/login/signinchooser?flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i className="fab fa-google-plus-g"></i></a>
								<a href="https://twitter.com/?lang=en"><i className="fab fa-twitter"></i></a>
							</div>
						</div>
					</div>
					<div className="mem_text">
						<h3>John Doe</h3>
						<span>Project Manager</span>
					</div>
					</div>
				</div>
			</div>
		</div>
{/* <!------------------------------------ TEAM END --------------------------------------> */}

            
            </div>
        )
    }
}
