import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element: Element, isAuthenticated, ...rest }) => {

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
