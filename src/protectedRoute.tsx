import React, { useContext } from 'react'
import { Outlet, Navigate } from 'react-router';
import { AuthContext } from './contexts/auth.context';

const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {

    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
}

export default ProtectedRoute;