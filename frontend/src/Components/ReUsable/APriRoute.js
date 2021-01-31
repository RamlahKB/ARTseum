import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux'; 

const APriRoute=({component:Component, adAuth, ...rest})=>(
    <Route
        {...rest}
        render={props =>
            adAuth.isAuth === true?(
                <Component {...props}/>
            ):
            (
                <Redirect to="/"/>
            )
        }
    />
)

APriRoute.propTypes = {
    adAuth : propTypes.object.isRequired
};

const mapStateToProps=state=>({
    adAuth : state.adAuth
});

export default connect(mapStateToProps)(APriRoute);