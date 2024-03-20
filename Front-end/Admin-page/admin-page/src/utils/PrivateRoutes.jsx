// import { Outlet, Navigate } from 'react-router-dom';

// const PrivateRoutes = ({ children, ...rest }) => {
//     const role = localStorage.getItem('role');

//     return (
//         // if role is ADMIN or MANAGER, then return Outlet, else return Navigate to /login
//         role === "ADMIN" || role === "MANAGER" ? <Outlet /> : <Navigate to="/login" />
//     ); 
// }

// export default PrivateRoutes;
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = ({ children, ...rest }) => {
    const role = localStorage.getItem('role');

    // Kiểm tra nếu role không tồn tại hoặc không hợp lệ (ví dụ: null hoặc undefined), redirect đến trang login
    if (!role || (role !== "ADMIN" && role !== "MANAGER")) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default PrivateRoutes;
