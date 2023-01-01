import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Shared/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <p className='text-red-700 min-h-[80vh] text-center'><LoadingSpinner/></p>
    }


    if (user && user.uid) {
        return children;
    }
    else {
        return (
            <Navigate to="/signin" state={{from: location}} replace></Navigate>
        );
    };
};

export default PrivateRoute;