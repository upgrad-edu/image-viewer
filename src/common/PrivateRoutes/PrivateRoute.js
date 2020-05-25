import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isUserLoggedIn } from '../utils';

const PrivateRoute = ({ component: Component, ...rest }) => {
	return (


		<Route {...rest} render={props => (
			isUserLoggedIn() ?
				<Component {...props} />
				: <Redirect to="/" />
		)} />
	);
};

export default PrivateRoute;
