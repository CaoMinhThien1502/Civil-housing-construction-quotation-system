import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, ...rest }) => {
    const role = localStorage.getItem('role');

    return (
        // if role is ADMIN or MANAGER, then return Outlet, else return Navigate to /login
        role === "ADMIN" || role === "MANAGER" ? <Outlet /> : <Navigate to="/login" />
    ); 
}

export default PrivateRoutes;