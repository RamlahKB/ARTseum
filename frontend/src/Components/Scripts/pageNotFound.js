import React, { Component } from 'react';

export default class pageNotFound extends Component {
    render() {
        return (
            <div className="container" style={{margin:"80px auto"}}>
                <div className="pb-4" style={{background:"#2c4061", borderRadius:"20px"}}>
                    <section className="error-container">
                        <span>4</span>
                        <span><span className="screen-reader-text">0</span></span>
                        <span>4</span>
                    </section>
                    <div className="text-center mb-5">
                    <h1 className="text-white">Oops! Something went wrong!</h1>
                    <a className="btn btn-outline-light" href="/">Return Home</a>
                    </div>
                </div>
            </div>
        )
    }
}
