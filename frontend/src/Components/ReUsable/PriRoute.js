import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import propTypes from 'prop-types';
import {connect} from 'react-redux'; 

const PriRoute=({component:Component, auth, ...rest})=>(
    <Route
        {...rest}
        render={props =>
            auth.isAuth === true?(
                <Component {...props}/>
            ):
            (
                <Redirect to="/login"/>
            )
        }
    />
)

PriRoute.propTypes = {
    auth : propTypes.object.isRequired
};

const mapStateToProps=state=>({
    auth : state.auth
});

export default connect(mapStateToProps)(PriRoute);