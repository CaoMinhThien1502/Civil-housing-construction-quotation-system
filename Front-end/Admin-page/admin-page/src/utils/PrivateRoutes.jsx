import { Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const PrivateRoutes = ({ children, ...rest }) => {
    const role = localStorage.getItem('role');

    return (
        // token ? <Outlet /> : <Navigate to="/login" />
        // if role is ADMIN or MANAGER, then return Outlet, else return Navigate to /login
        role === "ADMIN" || role === "MANAGER" ? <Outlet /> : <Navigate to="/login" />
    );  
}

export default PrivateRoutes;