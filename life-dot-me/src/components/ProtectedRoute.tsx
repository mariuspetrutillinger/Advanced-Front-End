import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({redirectPath = '/not-allowed', children}) => {
    const isAllowed = localStorage.getItem('isAllowed');
    console.log(isAllowed);

    if (isAllowed === 'false') {
        return <Navigate to={redirectPath} replace/>;
    }

    return children;
};

export default ProtectedRoute;