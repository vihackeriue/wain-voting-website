import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/jwt';


const PrivateRoute = ({ children, requiredRole }) => {
    const role = getUserRole();
    console.log("role", role)
    if (!role) return <Navigate to="/login" />;
    if (requiredRole && role !== requiredRole) return <Navigate to="/unauthorized" />;

    return children;
};

export default PrivateRoute;
