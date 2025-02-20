// PrivateRoute.js
import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    return (
        <Route
            {...rest}
            render={props =>
                isAuthenticated ? (
                    <Component {...props} />
                ) : (
                    <Redirect to={{ pathname: '/', state: { from: props.location } }} />
                )}
        />
    )
}

export default PrivateRoute;
