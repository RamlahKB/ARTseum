import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const APubRoute=({component:Component, adAuth, ...rest})=>(
    <Route
        {...rest}
        render={props=>
            adAuth.isAuth === false ? (
                <Component {...props}></Component>
            ):
            (
                <Redirect to="/dash"></Redirect>
            )
        }
    />
)

APubRoute.propTypes={
    adAuth : propTypes.object.isRequired
}

const mapStateToProps=state=>({
    adAuth : state.adAuth
})

export default connect(mapStateToProps)(APubRoute);