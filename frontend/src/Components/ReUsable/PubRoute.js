import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const PubRoute=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            auth.isAuth === false ? (
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/art"></Redirect>
            )
        }
    /> 
)

PubRoute.propTypes={
    auth : propTypes.object.isRequired
}

const mapStateToProps=state=>({
    auth : state.auth
})

export default connect(mapStateToProps)(PubRoute);